"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreController = void 0;
const error_middleware_1 = require("../middleware/error.middleware");
const store_service_1 = __importDefault(require("../services/store.service"));
const telegram_service_1 = __importDefault(require("../services/telegram.service"));
const response_util_1 = require("../utils/response.util");
const validators_1 = require("../validators");
const database_1 = __importDefault(require("../config/database"));
class StoreController {
    constructor() {
        /**
         * Create store (User or Admin)
         * POST /api/stores
         */
        this.createStore = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const user = req.user;
            const data = validators_1.createStoreSchema.parse(req.body);
            try {
                const store = await store_service_1.default.createStore(user.id, data);
                // Send store data back to Telegram bot
                await telegram_service_1.default.sendStoreDataToBot(store);
                // Notify admins for approval
                const categories = store.categories?.map((sc) => sc.category.title) || [];
                await telegram_service_1.default.notifyAdminsAboutNewStore({
                    id: store.id,
                    title: store.title,
                    ownerTelegramId: user.telegramId,
                    ownerName: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
                    categoryNames: categories,
                });
                return (0, response_util_1.sendCreated)(res, store, 'Store created successfully and sent for approval');
            }
            catch (error) {
                // Send error back to Telegram bot
                await telegram_service_1.default.sendErrorToBot(user.telegramId, error.message);
                throw error;
            }
        });
        /**
         * Approve store (Admin only)
         * POST /api/stores/:id/approve
         */
        this.approveStore = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const admin = req.admin;
            const storeId = parseInt(req.params.id);
            const store = await store_service_1.default.approveStore(storeId, admin.id);
            // Note: Notifications are handled by the Telegram bot after receiving the API response
            return (0, response_util_1.sendSuccess)(res, store, 'Store approved successfully');
        });
        /**
         * Reject store (Admin only)
         * POST /api/stores/:id/reject
         */
        this.rejectStore = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const admin = req.admin;
            const storeId = parseInt(req.params.id);
            const { reason } = req.body;
            if (!reason) {
                return (0, response_util_1.sendError)(res, 'Rejection reason is required', 400);
            }
            const store = await store_service_1.default.rejectStore(storeId, admin.id, reason);
            // Note: Notifications are handled by the Telegram bot after receiving the API response
            return (0, response_util_1.sendSuccess)(res, store, 'Store rejected');
        });
        /**
         * Update store
         * PUT /api/stores/:id
         */
        this.updateStore = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const user = req.user;
            const admin = req.admin;
            const storeId = parseInt(req.params.id);
            const data = validators_1.updateStoreSchema.parse(req.body);
            const store = await store_service_1.default.updateStore(storeId, user?.id || admin.id, data, !!admin);
            // Notify store owner if updated by admin
            if (admin) {
                const owner = store.user;
                await telegram_service_1.default.notifyStoreUpdate({
                    ownerTelegramId: owner.telegramId,
                    title: store.title,
                    updatedFields: Object.keys(data),
                });
            }
            return (0, response_util_1.sendSuccess)(res, store, 'Store updated successfully');
        });
        /**
         * Delete store
         * DELETE /api/stores/:id
         */
        this.deleteStore = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const user = req.user;
            const admin = req.admin;
            const storeId = parseInt(req.params.id);
            const store = await store_service_1.default.deleteStore(storeId, user?.id || admin.id, !!admin);
            // Notify store owner (fetch user separately)
            const owner = await database_1.default.user.findUnique({ where: { id: store.userId } });
            if (owner) {
                await telegram_service_1.default.notifyStoreDeletion({
                    ownerTelegramId: owner.telegramId,
                    title: store.title,
                    reason: req.body.reason,
                });
            }
            return (0, response_util_1.sendSuccess)(res, { id: storeId }, 'Store deleted successfully');
        });
        /**
         * Get store by ID
         * GET /api/stores/:id
         */
        this.getStore = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const storeId = parseInt(req.params.id);
            const store = await store_service_1.default.getStoreById(storeId);
            return (0, response_util_1.sendSuccess)(res, store);
        });
        /**
         * Get store by slug
         * GET /api/stores/slug/:slug
         */
        this.getStoreBySlug = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const slug = req.params.slug;
            const store = await store_service_1.default.getStoreBySlug(slug);
            return (0, response_util_1.sendSuccess)(res, store);
        });
        /**
         * List stores
         * GET /api/stores
         */
        this.listStores = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const { page, limit, categoryId, isApproved, search, userId } = req.query;
            const result = await store_service_1.default.listStores({
                page: page ? parseInt(page) : undefined,
                limit: limit ? parseInt(limit) : undefined,
                categoryId: categoryId ? parseInt(categoryId) : undefined,
                isApproved: isApproved === 'true' ? true : isApproved === 'false' ? false : undefined,
                search: search,
                userId: userId,
            });
            return (0, response_util_1.sendSuccess)(res, result.stores, 'Stores retrieved successfully', 200, result.meta);
        });
        /**
         * Get pending stores (Admin only)
         * GET /api/stores/pending
         */
        this.getPendingStores = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const { page, limit } = req.query;
            const result = await store_service_1.default.getPendingStores(page ? parseInt(page) : undefined, limit ? parseInt(limit) : undefined);
            return (0, response_util_1.sendSuccess)(res, result.stores, 'Pending stores retrieved', 200, result.meta);
        });
    }
}
exports.StoreController = StoreController;
exports.default = new StoreController();
//# sourceMappingURL=store.controller.js.map