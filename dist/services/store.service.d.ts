import { CreateStoreInput, UpdateStoreInput } from '../validators';
export declare class StoreService {
    /**
     * Create a new store
     */
    createStore(userId: number, data: CreateStoreInput): Promise<{
        user: {
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
        };
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
    }>;
    /**
     * Approve store (Admin only)
     */
    approveStore(storeId: number, adminId: number): Promise<{
        user: {
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
        };
        approvedBy: {
            id: number;
            telegramId: string;
            telegramAvatar: string | null;
            phoneNumber: string;
            telegramName: string;
            role: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        } | null;
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
    }>;
    /**
     * Reject store (Admin only)
     */
    rejectStore(storeId: number, adminId: number, reason: string): Promise<{
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
    }>;
    /**
     * Update store
     */
    updateStore(storeId: number, userId: number, data: UpdateStoreInput, isAdmin?: boolean): Promise<{
        user: {
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
        };
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
    }>;
    /**
     * Delete store
     */
    deleteStore(storeId: number, userId: number, isAdmin?: boolean): Promise<{
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
    }>;
    /**
     * Get store by ID
     */
    getStoreById(storeId: number): Promise<{
        user: {
            id: number;
            telegramId: string;
            telegramUsername: string | null;
            firstName: string | null;
            lastName: string | null;
        };
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
        products: {
            title: string;
            description: string | null;
            longDescription: string | null;
            id: number;
            tags: string;
            storeId: number;
            categoryId: number | null;
            properties: string;
            pricing: string;
            colors: string;
            colorVariations: string | null;
            availability: string;
            stockQuantity: number | null;
            brand: string | null;
            manufacturer: string | null;
            condition: string | null;
            images: string;
            sourceMetadata: string | null;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            isFeatured: boolean;
            seoTitle: string | null;
            seoDescription: string | null;
            seoKeywords: string;
            stats: string | null;
            isPublished: boolean;
            madeIn: string | null;
            qualityGrade: string | null;
            occasion: string | null;
            features: string;
            benefits: string;
            imagesAnalysis: string | null;
            isDeleted: boolean;
            publishedAt: Date | null;
            deletedAt: Date | null;
        }[];
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
    }>;
    /**
     * Get store by slug
     */
    getStoreBySlug(slug: string): Promise<{
        user: {
            id: number;
            telegramId: string;
            telegramUsername: string | null;
            firstName: string | null;
            lastName: string | null;
        };
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
        products: {
            title: string;
            description: string | null;
            longDescription: string | null;
            id: number;
            tags: string;
            storeId: number;
            categoryId: number | null;
            properties: string;
            pricing: string;
            colors: string;
            colorVariations: string | null;
            availability: string;
            stockQuantity: number | null;
            brand: string | null;
            manufacturer: string | null;
            condition: string | null;
            images: string;
            sourceMetadata: string | null;
            slug: string;
            createdAt: Date;
            updatedAt: Date;
            isFeatured: boolean;
            seoTitle: string | null;
            seoDescription: string | null;
            seoKeywords: string;
            stats: string | null;
            isPublished: boolean;
            madeIn: string | null;
            qualityGrade: string | null;
            occasion: string | null;
            features: string;
            benefits: string;
            imagesAnalysis: string | null;
            isDeleted: boolean;
            publishedAt: Date | null;
            deletedAt: Date | null;
        }[];
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
    }>;
    /**
     * List stores with pagination and filters
     */
    listStores(params: {
        page?: number;
        limit?: number;
        categoryId?: number;
        isApproved?: boolean;
        search?: string;
    }): Promise<{
        stores: ({
            user: {
                id: number;
                telegramId: string;
                telegramUsername: string | null;
            };
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
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPrevPage: boolean;
        };
    }>;
    /**
     * Get pending stores (for admin review)
     */
    getPendingStores(page?: number, limit?: number): Promise<{
        stores: ({
            user: {
                id: number;
                telegramId: string;
                telegramUsername: string | null;
            };
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
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPrevPage: boolean;
        };
    }>;
}
declare const _default: StoreService;
export default _default;
//# sourceMappingURL=store.service.d.ts.map