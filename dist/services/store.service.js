"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreService = void 0;
const database_1 = __importDefault(require("../config/database"));
const errors_util_1 = require("../utils/errors.util");
const helpers_util_1 = require("../utils/helpers.util");
class StoreService {
    /**
     * Create a new store
     */
    async createStore(userId, data) {
        // Check if user exists
        const user = await database_1.default.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new errors_util_1.NotFoundError('User not found');
        }
        // Check if national code is already used
        const existingStore = await database_1.default.store.findFirst({
            where: {
                identity: {
                    contains: data.identity.nationalCode,
                },
            },
        });
        if (existingStore) {
            throw new errors_util_1.ConflictError('Store with this national code already exists');
        }
        // Check if telegram channel ID is already used (simplified for SQLite)
        // Note: Full JSON query not available in SQLite, would need custom validation
        const allStores = await database_1.default.store.findMany();
        const existingTelegramStore = allStores.find(s => {
            try {
                const socials = JSON.parse(s.socials);
                return socials?.telegram?.id === data.socials.telegram.id;
            }
            catch {
                return false;
            }
        });
        if (existingTelegramStore) {
            throw new errors_util_1.ConflictError('Store with this Telegram channel is already registered');
        }
        // Generate slug
        const slug = (0, helpers_util_1.generateSlug)(data.title, Date.now().toString(36));
        // Create store
        const store = await database_1.default.store.create({
            data: {
                userId,
                title: data.title,
                slug,
                description: data.description,
                longDescription: data.longDescription,
                socials: JSON.stringify(data.socials),
                identity: JSON.stringify(data.identity),
                avatar: data.avatar,
                coverImage: data.coverImage,
                tags: JSON.stringify(data.tags || []),
                isApproved: false,
                isActive: true,
                seoTitle: data.title,
                seoDescription: data.description,
                seoKeywords: JSON.stringify(data.tags || []),
                stats: JSON.stringify({
                    views: 0,
                    clicks: 0,
                    products: 0,
                    orders: 0,
                }),
                settings: JSON.stringify({
                    autoPublish: false,
                    allowReviews: true,
                    showContact: true,
                    languages: ['fa'],
                }),
                storeCategories: {
                    create: data.categoryIds.map((categoryId, index) => ({
                        categoryId,
                        isPrimary: index === 0,
                    })),
                },
            },
            include: {
                user: true,
                storeCategories: {
                    include: {
                        category: true,
                    },
                },
            },
        });
        // Log store creation action
        await database_1.default.storeAction.create({
            data: {
                storeId: store.id,
                actionType: 'CREATED',
                description: `Store "${store.title}" was created by user ${user.telegramId}`,
                metadata: JSON.stringify({
                    userId: user.id,
                    telegramId: user.telegramId,
                }),
            },
        });
        return store;
    }
    /**
     * Approve store (Admin only)
     */
    async approveStore(storeId, adminId) {
        const store = await database_1.default.store.findUnique({
            where: { id: storeId },
            include: {
                user: true,
            },
        });
        if (!store) {
            throw new errors_util_1.NotFoundError('Store not found');
        }
        if (store.isApproved) {
            throw new errors_util_1.ConflictError('Store is already approved');
        }
        // Parse socials JSON string
        // QR code generation disabled for Node 19 compatibility
        const qrCode = null;
        // Update store
        const updatedStore = await database_1.default.store.update({
            where: { id: storeId },
            data: {
                isApproved: true,
                approvedAt: new Date(),
                approvedById: adminId,
                qrCode: qrCode ? JSON.stringify(qrCode) : null,
            },
            include: {
                user: true,
                approvedBy: true,
            },
        });
        // Log approval action
        await database_1.default.storeAction.create({
            data: {
                storeId: store.id,
                adminId,
                actionType: 'APPROVED',
                description: `Store "${store.title}" was approved`,
            },
        });
        // Note: QR code notifications are handled by the Telegram bot
        // The bot fetches the updated store data (including qrCode) and sends it to both owner and admin
        return updatedStore;
    }
    /**
     * Reject store (Admin only)
     */
    async rejectStore(storeId, adminId, reason) {
        const store = await database_1.default.store.findUnique({
            where: { id: storeId },
        });
        if (!store) {
            throw new errors_util_1.NotFoundError('Store not found');
        }
        const updatedStore = await database_1.default.store.update({
            where: { id: storeId },
            data: {
                isApproved: false,
                rejectionReason: reason,
            },
        });
        // Log rejection action
        await database_1.default.storeAction.create({
            data: {
                storeId: store.id,
                adminId,
                actionType: 'REJECTED',
                description: `Store "${store.title}" was rejected: ${reason}`,
                metadata: JSON.stringify({ reason }),
            },
        });
        return updatedStore;
    }
    /**
     * Update store
     */
    async updateStore(storeId, userId, data, isAdmin = false) {
        const store = await database_1.default.store.findUnique({
            where: { id: storeId },
        });
        if (!store) {
            throw new errors_util_1.NotFoundError('Store not found');
        }
        // Check ownership
        if (!isAdmin && store.userId !== userId) {
            throw new errors_util_1.ConflictError('You do not have permission to update this store');
        }
        const updateData = {};
        if (data.title)
            updateData.title = data.title;
        if (data.description)
            updateData.description = data.description;
        if (data.longDescription)
            updateData.longDescription = data.longDescription;
        if (data.socials)
            updateData.socials = data.socials;
        if (data.identity)
            updateData.identity = data.identity;
        if (data.avatar)
            updateData.avatar = data.avatar;
        if (data.coverImage)
            updateData.coverImage = data.coverImage;
        if (data.tags)
            updateData.tags = data.tags;
        const updatedStore = await database_1.default.store.update({
            where: { id: storeId },
            data: updateData,
            include: {
                user: true,
                storeCategories: {
                    include: {
                        category: true,
                    },
                },
            },
        });
        // Log update action
        await database_1.default.storeAction.create({
            data: {
                storeId: store.id,
                adminId: isAdmin ? userId : null,
                actionType: 'UPDATED',
                description: `Store "${store.title}" was updated`,
                metadata: JSON.stringify({ updatedFields: Object.keys(updateData) }),
            },
        });
        return updatedStore;
    }
    /**
     * Delete store
     */
    async deleteStore(storeId, userId, isAdmin = false) {
        const store = await database_1.default.store.findUnique({
            where: { id: storeId },
            include: { user: true },
        });
        if (!store) {
            throw new errors_util_1.NotFoundError('Store not found');
        }
        // Check ownership
        if (!isAdmin && store.userId !== userId) {
            throw new errors_util_1.ConflictError('You do not have permission to delete this store');
        }
        // Soft delete by setting isActive to false
        const deletedStore = await database_1.default.store.update({
            where: { id: storeId },
            data: { isActive: false },
        });
        // Log deletion action
        await database_1.default.storeAction.create({
            data: {
                storeId: store.id,
                adminId: isAdmin ? userId : null,
                actionType: 'DELETED',
                description: `Store "${store.title}" was deleted`,
            },
        });
        return deletedStore;
    }
    /**
     * Get store by ID
     */
    async getStoreById(storeId) {
        const store = await database_1.default.store.findUnique({
            where: { id: storeId },
            include: {
                user: {
                    select: {
                        id: true,
                        telegramId: true,
                        telegramUsername: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                storeCategories: {
                    include: {
                        category: true,
                    },
                },
                products: {
                    where: { isPublished: true },
                    take: 10,
                    orderBy: { createdAt: 'desc' },
                },
            },
        });
        if (!store) {
            throw new errors_util_1.NotFoundError('Store not found');
        }
        // Increment view count
        await database_1.default.store.update({
            where: { id: storeId },
            data: {
                stats: {
                    ...store.stats,
                    views: (store.stats?.views || 0) + 1,
                },
            },
        });
        return store;
    }
    /**
     * Get store by slug
     */
    async getStoreBySlug(slug) {
        const store = await database_1.default.store.findUnique({
            where: { slug },
            include: {
                user: {
                    select: {
                        id: true,
                        telegramId: true,
                        telegramUsername: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                storeCategories: {
                    include: {
                        category: true,
                    },
                },
                products: {
                    where: { isPublished: true },
                    take: 10,
                    orderBy: { createdAt: 'desc' },
                },
            },
        });
        if (!store) {
            throw new errors_util_1.NotFoundError('Store not found');
        }
        return store;
    }
    /**
     * List stores with pagination and filters
     */
    async listStores(params) {
        const { skip, take, page, limit } = (0, helpers_util_1.getPaginationParams)(params.page, params.limit);
        const where = {
            isActive: true,
        };
        if (params.isApproved !== undefined) {
            where.isApproved = params.isApproved;
        }
        if (params.categoryId) {
            where.storeCategories = {
                some: {
                    categoryId: params.categoryId,
                },
            };
        }
        if (params.search) {
            where.OR = [
                { title: { contains: params.search, mode: 'insensitive' } },
                { description: { contains: params.search, mode: 'insensitive' } },
                { tags: { has: params.search } },
            ];
        }
        const [stores, total] = await Promise.all([
            database_1.default.store.findMany({
                where,
                skip,
                take,
                include: {
                    user: {
                        select: {
                            id: true,
                            telegramId: true,
                            telegramUsername: true,
                        },
                    },
                    storeCategories: {
                        include: {
                            category: true,
                        },
                    },
                },
                orderBy: { createdAt: 'desc' },
            }),
            database_1.default.store.count({ where }),
        ]);
        const meta = (0, helpers_util_1.getPaginationMeta)(total, page, limit);
        return { stores, meta };
    }
    /**
     * Get pending stores (for admin review)
     */
    async getPendingStores(page, limit) {
        return this.listStores({ page, limit, isApproved: false });
    }
}
exports.StoreService = StoreService;
exports.default = new StoreService();
//# sourceMappingURL=store.service.js.map