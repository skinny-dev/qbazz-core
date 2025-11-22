import { CreateUserInput } from '../validators';
export declare class UserService {
    /**
     * Create or update user (upsert)
     */
    upsertUser(data: CreateUserInput): Promise<{
        id: number;
        telegramId: string;
        telegramAvatar: string | null;
        telegramUsername: string | null;
        firstName: string | null;
        lastName: string | null;
        phoneNumber: string | null;
        isActive: boolean;
        isBanned: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    /**
     * Get user by ID
     */
    getUserById(userId: number): Promise<{
        stores: ({
            categories: ({
                category: {
                    title: string;
                    description: string | null;
                    id: number;
                    slug: string;
                    icon: string | null;
                    parentId: number | null;
                    metaTitle: string | null;
                    metaDescription: string | null;
                    metaKeywords: string;
                    isActive: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                    sortOrder: number;
                };
            } & {
                id: number;
                storeId: number;
                categoryId: number;
                createdAt: Date;
                isPrimary: boolean;
            })[];
        } & {
            title: string;
            description: string | null;
            longDescription: string | null;
            socials: string;
            id: number;
            avatar: string | null;
            identity: string;
            coverImage: string | null;
            tags: string;
            slug: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            qrCode: string | null;
            isApproved: boolean;
            approvedAt: Date | null;
            approvedById: number | null;
            rejectionReason: string | null;
            isFeatured: boolean;
            seoTitle: string | null;
            seoDescription: string | null;
            seoKeywords: string;
            geoData: string | null;
            businessDetails: string | null;
            stats: string | null;
            settings: string | null;
            lastActiveAt: Date | null;
        })[];
    } & {
        id: number;
        telegramId: string;
        telegramAvatar: string | null;
        telegramUsername: string | null;
        firstName: string | null;
        lastName: string | null;
        phoneNumber: string | null;
        isActive: boolean;
        isBanned: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    /**
     * Get user by Telegram ID
     */
    getUserByTelegramId(telegramId: string): Promise<{
        stores: ({
            categories: ({
                category: {
                    title: string;
                    description: string | null;
                    id: number;
                    slug: string;
                    icon: string | null;
                    parentId: number | null;
                    metaTitle: string | null;
                    metaDescription: string | null;
                    metaKeywords: string;
                    isActive: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                    sortOrder: number;
                };
            } & {
                id: number;
                storeId: number;
                categoryId: number;
                createdAt: Date;
                isPrimary: boolean;
            })[];
        } & {
            title: string;
            description: string | null;
            longDescription: string | null;
            socials: string;
            id: number;
            avatar: string | null;
            identity: string;
            coverImage: string | null;
            tags: string;
            slug: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            qrCode: string | null;
            isApproved: boolean;
            approvedAt: Date | null;
            approvedById: number | null;
            rejectionReason: string | null;
            isFeatured: boolean;
            seoTitle: string | null;
            seoDescription: string | null;
            seoKeywords: string;
            geoData: string | null;
            businessDetails: string | null;
            stats: string | null;
            settings: string | null;
            lastActiveAt: Date | null;
        })[];
    } & {
        id: number;
        telegramId: string;
        telegramAvatar: string | null;
        telegramUsername: string | null;
        firstName: string | null;
        lastName: string | null;
        phoneNumber: string | null;
        isActive: boolean;
        isBanned: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    /**
     * Ban user
     */
    banUser(userId: number): Promise<{
        id: number;
        telegramId: string;
        telegramAvatar: string | null;
        telegramUsername: string | null;
        firstName: string | null;
        lastName: string | null;
        phoneNumber: string | null;
        isActive: boolean;
        isBanned: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    /**
     * Unban user
     */
    unbanUser(userId: number): Promise<{
        id: number;
        telegramId: string;
        telegramAvatar: string | null;
        telegramUsername: string | null;
        firstName: string | null;
        lastName: string | null;
        phoneNumber: string | null;
        isActive: boolean;
        isBanned: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
declare const _default: UserService;
export default _default;
//# sourceMappingURL=user.service.d.ts.map