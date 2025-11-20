"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const database_1 = __importDefault(require("../config/database"));
const errors_util_1 = require("../utils/errors.util");
const helpers_util_1 = require("../utils/helpers.util");
class CategoryService {
    /**
     * Create category
     */
    async createCategory(data) {
        const category = await database_1.default.category.create({
            data: {
                title: data.title,
                slug: data.slug,
                icon: data.icon,
                description: data.description,
                parentId: data.parentId,
                metaTitle: data.metaTitle || data.title,
                metaDescription: data.metaDescription,
                metaKeywords: JSON.stringify(data.metaKeywords || []),
            },
        });
        return category;
    }
    /**
     * Update category
     */
    async updateCategory(categoryId, data) {
        const category = await database_1.default.category.findUnique({
            where: { id: categoryId },
        });
        if (!category) {
            throw new errors_util_1.NotFoundError('Category not found');
        }
        const updateData = { ...data };
        if (updateData.metaKeywords) {
            updateData.metaKeywords = JSON.stringify(updateData.metaKeywords);
        }
        const updatedCategory = await database_1.default.category.update({
            where: { id: categoryId },
            data: updateData,
        });
        return updatedCategory;
    }
    /**
     * Delete category
     */
    async deleteCategory(categoryId) {
        const category = await database_1.default.category.findUnique({
            where: { id: categoryId },
            include: {
                children: true,
                storeCategories: true,
                products: true,
            },
        });
        if (!category) {
            throw new errors_util_1.NotFoundError('Category not found');
        }
        // Check if category has children or is being used
        if (category.children.length > 0) {
            throw new Error('Cannot delete category with subcategories');
        }
        if (category.storeCategories.length > 0 || category.products.length > 0) {
            throw new Error('Cannot delete category that is being used by stores or products');
        }
        await database_1.default.category.delete({
            where: { id: categoryId },
        });
        return category;
    }
    /**
     * Get category by ID
     */
    async getCategoryById(categoryId) {
        const category = await database_1.default.category.findUnique({
            where: { id: categoryId },
            include: {
                parent: true,
                children: true,
            },
        });
        if (!category) {
            throw new errors_util_1.NotFoundError('Category not found');
        }
        return category;
    }
    /**
     * Get category by slug
     */
    async getCategoryBySlug(slug) {
        const category = await database_1.default.category.findUnique({
            where: { slug },
            include: {
                parent: true,
                children: true,
            },
        });
        if (!category) {
            throw new errors_util_1.NotFoundError('Category not found');
        }
        return category;
    }
    /**
     * List all categories
     */
    async listCategories(params) {
        if (params?.page || params?.limit) {
            const { skip, take, page, limit } = (0, helpers_util_1.getPaginationParams)(params.page, params.limit);
            const where = {
                isActive: true,
            };
            if (params.parentId !== undefined) {
                where.parentId = params.parentId;
            }
            const [categories, total] = await Promise.all([
                database_1.default.category.findMany({
                    where,
                    skip,
                    take,
                    include: {
                        parent: true,
                        children: true,
                    },
                    orderBy: [{ sortOrder: 'asc' }, { title: 'asc' }],
                }),
                database_1.default.category.count({ where }),
            ]);
            const meta = (0, helpers_util_1.getPaginationMeta)(total, page, limit);
            return { categories, meta };
        }
        // Return all categories without pagination
        const categories = await database_1.default.category.findMany({
            where: { isActive: true },
            include: {
                parent: true,
                children: true,
            },
            orderBy: [{ sortOrder: 'asc' }, { title: 'asc' }],
        });
        return { categories };
    }
    /**
     * Get root categories (no parent)
     */
    async getRootCategories() {
        const categories = await database_1.default.category.findMany({
            where: {
                parentId: null,
                isActive: true,
            },
            include: {
                children: true,
            },
            orderBy: [{ sortOrder: 'asc' }, { title: 'asc' }],
        });
        return categories;
    }
    /**
     * Get category tree (hierarchical structure)
     */
    async getCategoryTree() {
        const categories = await database_1.default.category.findMany({
            where: { isActive: true },
            include: {
                children: {
                    include: {
                        children: true,
                    },
                },
            },
            orderBy: [{ sortOrder: 'asc' }, { title: 'asc' }],
        });
        // Filter to get only root categories (parentId is null)
        const rootCategories = categories.filter((cat) => cat.parentId === null);
        return rootCategories;
    }
}
exports.CategoryService = CategoryService;
exports.default = new CategoryService();
//# sourceMappingURL=category.service.js.map