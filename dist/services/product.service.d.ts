import { CreateProductInput, UpdateProductInput } from '../validators';
export declare class ProductService {
    /**
     * Create a new product (from Telegram bot data)
     */
    createProduct(data: CreateProductInput): Promise<{
        store: {
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
        };
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
        } | null;
    } & {
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
    }>;
    /**
     * Update product
     */
    updateProduct(productId: number, data: UpdateProductInput): Promise<{
        store: {
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
        };
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
        } | null;
    } & {
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
    }>;
    /**
     * Delete product (soft delete)
     */
    deleteProduct(productId: number): Promise<{
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
    }>;
    /**
     * Publish product
     */
    publishProduct(productId: number): Promise<{
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
    }>;
    /**
     * Unpublish product
     */
    unpublishProduct(productId: number): Promise<{
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
    }>;
    /**
     * Get product by ID
     */
    getProductById(productId: number): Promise<{
        store: {
            user: {
                id: number;
                telegramId: string;
                telegramUsername: string | null;
            };
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
        };
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
        } | null;
    } & {
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
    }>;
    /**
     * Get product by slug
     */
    getProductBySlug(slug: string): Promise<{
        store: {
            user: {
                id: number;
                telegramId: string;
                telegramUsername: string | null;
            };
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
        };
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
        } | null;
    } & {
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
    }>;
    /**
     * List products with pagination and filters
     */
    listProducts(params: {
        page?: number;
        limit?: number;
        storeId?: number;
        categoryId?: number;
        search?: string;
        isPublished?: boolean;
        isFeatured?: boolean;
    }): Promise<{
        products: ({
            store: {
                title: string;
                id: number;
                avatar: string | null;
                slug: string;
            };
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
            } | null;
        } & {
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
     * Get products by store
     */
    getProductsByStore(storeId: number, page?: number, limit?: number): Promise<{
        products: ({
            store: {
                title: string;
                id: number;
                avatar: string | null;
                slug: string;
            };
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
            } | null;
        } & {
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
     * Search products (public endpoint)
     */
    searchProducts(query: string, page?: number, limit?: number): Promise<{
        products: ({
            store: {
                title: string;
                id: number;
                avatar: string | null;
                slug: string;
            };
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
            } | null;
        } & {
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
declare const _default: ProductService;
export default _default;
//# sourceMappingURL=product.service.d.ts.map