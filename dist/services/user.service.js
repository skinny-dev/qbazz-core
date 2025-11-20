"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const database_1 = __importDefault(require("../config/database"));
const errors_util_1 = require("../utils/errors.util");
class UserService {
    /**
     * Create or update user (upsert)
     */
    async upsertUser(data) {
        const user = await database_1.default.user.upsert({
            where: { telegramId: data.telegramId },
            update: {
                telegramAvatar: data.telegramAvatar,
                telegramUsername: data.telegramUsername,
                firstName: data.firstName,
                lastName: data.lastName,
                phoneNumber: data.phoneNumber,
            },
            create: data,
        });
        return user;
    }
    /**
     * Get user by ID
     */
    async getUserById(userId) {
        const user = await database_1.default.user.findUnique({
            where: { id: userId },
            include: {
                stores: {
                    include: {
                        storeCategories: {
                            include: {
                                category: true,
                            },
                        },
                    },
                },
            },
        });
        if (!user) {
            throw new errors_util_1.NotFoundError('User not found');
        }
        return user;
    }
    /**
     * Get user by Telegram ID
     */
    async getUserByTelegramId(telegramId) {
        const user = await database_1.default.user.findUnique({
            where: { telegramId },
            include: {
                stores: {
                    include: {
                        storeCategories: {
                            include: {
                                category: true,
                            },
                        },
                    },
                },
            },
        });
        if (!user) {
            throw new errors_util_1.NotFoundError('User not found');
        }
        return user;
    }
    /**
     * Ban user
     */
    async banUser(userId) {
        const user = await database_1.default.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new errors_util_1.NotFoundError('User not found');
        }
        const bannedUser = await database_1.default.user.update({
            where: { id: userId },
            data: { isBanned: true, isActive: false },
        });
        // Deactivate all user's stores
        await database_1.default.store.updateMany({
            where: { userId },
            data: { isActive: false },
        });
        return bannedUser;
    }
    /**
     * Unban user
     */
    async unbanUser(userId) {
        const user = await database_1.default.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new errors_util_1.NotFoundError('User not found');
        }
        const unbannedUser = await database_1.default.user.update({
            where: { id: userId },
            data: { isBanned: false, isActive: true },
        });
        return unbannedUser;
    }
}
exports.UserService = UserService;
exports.default = new UserService();
//# sourceMappingURL=user.service.js.map