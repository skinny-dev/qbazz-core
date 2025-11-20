"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const error_middleware_1 = require("../middleware/error.middleware");
const user_service_1 = __importDefault(require("../services/user.service"));
const response_util_1 = require("../utils/response.util");
const validators_1 = require("../validators");
class UserController {
    constructor() {
        /**
         * Create or update user (upsert)
         * POST /api/users
         */
        this.upsertUser = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const data = validators_1.createUserSchema.parse(req.body);
            const user = await user_service_1.default.upsertUser(data);
            return (0, response_util_1.sendCreated)(res, user, 'User created/updated successfully');
        });
        /**
         * Get user by ID
         * GET /api/users/:id
         */
        this.getUser = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const userId = parseInt(req.params.id);
            const user = await user_service_1.default.getUserById(userId);
            return (0, response_util_1.sendSuccess)(res, user);
        });
        /**
         * Get user by Telegram ID
         * GET /api/users/telegram/:telegramId
         */
        this.getUserByTelegramId = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const telegramId = req.params.telegramId;
            const user = await user_service_1.default.getUserByTelegramId(telegramId);
            return (0, response_util_1.sendSuccess)(res, user);
        });
        /**
         * Get current user
         * GET /api/users/me
         */
        this.getCurrentUser = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const user = req.user;
            const fullUser = await user_service_1.default.getUserById(user.id);
            return (0, response_util_1.sendSuccess)(res, fullUser);
        });
        /**
         * Ban user (Admin only)
         * POST /api/users/:id/ban
         */
        this.banUser = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const userId = parseInt(req.params.id);
            const user = await user_service_1.default.banUser(userId);
            return (0, response_util_1.sendSuccess)(res, user, 'User banned successfully');
        });
        /**
         * Unban user (Admin only)
         * POST /api/users/:id/unban
         */
        this.unbanUser = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const userId = parseInt(req.params.id);
            const user = await user_service_1.default.unbanUser(userId);
            return (0, response_util_1.sendSuccess)(res, user, 'User unbanned successfully');
        });
    }
}
exports.UserController = UserController;
exports.default = new UserController();
//# sourceMappingURL=user.controller.js.map