import { CreateCategoryInput, UpdateCategoryInput } from '../validators';
export declare class CategoryService {
    /**
     * Create category
     */
    createCategory(data: CreateCategoryInput): Promise<{
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
    }>;
    /**
     * Update category
     */
    updateCategory(categoryId: number, data: UpdateCategoryInput): Promise<{
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
    }>;
    /**
     * Delete category
     */
    deleteCategory(categoryId: number): Promise<{
        storeCategories: {
            id: number;
            storeId: number;
            categoryId: number;
            createdAt: Date;
            isPrimary: boolean;
        }[];
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
        children: {
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
        }[];
    } & {
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
    }>;
    /**
     * Get category by ID
     */
    getCategoryById(categoryId: number): Promise<{
        parent: {
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
        children: {
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
        }[];
    } & {
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
    }>;
    /**
     * Get category by slug
     */
    getCategoryBySlug(slug: string): Promise<{
        parent: {
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
        children: {
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
        }[];
    } & {
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
    }>;
    /**
     * List all categories
     */
    listCategories(params?: {
        page?: number;
        limit?: number;
        parentId?: number | null;
    }): Promise<{
        categories: ({
            parent: {
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
            children: {
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
            }[];
        } & {
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
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPrevPage: boolean;
        };
    } | {
        categories: ({
            parent: {
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
            children: {
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
            }[];
        } & {
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
        })[];
        meta?: undefined;
    }>;
    /**
     * Get root categories (no parent)
     */
    getRootCategories(): Promise<({
        children: {
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
        }[];
    } & {
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
    })[]>;
    /**
     * Get category tree (hierarchical structure)
     */
    getCategoryTree(): Promise<({
        children: ({
            children: {
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
            }[];
        } & {
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
        })[];
    } & {
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
    })[]>;
}
declare const _default: CategoryService;
export default _default;
//# sourceMappingURL=category.service.d.ts.map