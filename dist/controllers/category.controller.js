"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const error_middleware_1 = require("../middleware/error.middleware");
const category_service_1 = __importDefault(require("../services/category.service"));
const response_util_1 = require("../utils/response.util");
const validators_1 = require("../validators");
class CategoryController {
    constructor() {
        /**
         * Create category (Admin only)
         * POST /api/categories
         */
        this.createCategory = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const data = validators_1.createCategorySchema.parse(req.body);
            const category = await category_service_1.default.createCategory(data);
            return (0, response_util_1.sendCreated)(res, category, 'Category created successfully');
        });
        /**
         * Update category (Admin only)
         * PUT /api/categories/:id
         */
        this.updateCategory = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const categoryId = parseInt(req.params.id);
            const data = validators_1.updateCategorySchema.parse(req.body);
            const category = await category_service_1.default.updateCategory(categoryId, data);
            return (0, response_util_1.sendSuccess)(res, category, 'Category updated successfully');
        });
        /**
         * Delete category (Admin only)
         * DELETE /api/categories/:id
         */
        this.deleteCategory = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const categoryId = parseInt(req.params.id);
            await category_service_1.default.deleteCategory(categoryId);
            return (0, response_util_1.sendSuccess)(res, { id: categoryId }, 'Category deleted successfully');
        });
        /**
         * Get category by ID
         * GET /api/categories/:id
         */
        this.getCategory = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const categoryId = parseInt(req.params.id);
            const category = await category_service_1.default.getCategoryById(categoryId);
            return (0, response_util_1.sendSuccess)(res, category);
        });
        /**
         * Get category by slug
         * GET /api/categories/slug/:slug
         */
        this.getCategoryBySlug = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const slug = req.params.slug;
            const category = await category_service_1.default.getCategoryBySlug(slug);
            return (0, response_util_1.sendSuccess)(res, category);
        });
        /**
         * List all categories
         * GET /api/categories
         */
        this.listCategories = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const { page, limit, parentId } = req.query;
            const result = await category_service_1.default.listCategories({
                page: page ? parseInt(page) : undefined,
                limit: limit ? parseInt(limit) : undefined,
                parentId: parentId ? parseInt(parentId) : parentId === 'null' ? null : undefined,
            });
            return (0, response_util_1.sendSuccess)(res, result.categories, 'Categories retrieved successfully', 200, result.meta);
        });
        /**
         * Get root categories
         * GET /api/categories/root
         */
        this.getRootCategories = (0, error_middleware_1.asyncHandler)(async (_req, res) => {
            const categories = await category_service_1.default.getRootCategories();
            return (0, response_util_1.sendSuccess)(res, categories, 'Root categories retrieved');
        });
        /**
         * Get category tree
         * GET /api/categories/tree
         */
        this.getCategoryTree = (0, error_middleware_1.asyncHandler)(async (_req, res) => {
            const tree = await category_service_1.default.getCategoryTree();
            return (0, response_util_1.sendSuccess)(res, tree, 'Category tree retrieved');
        });
    }
}
exports.CategoryController = CategoryController;
exports.default = new CategoryController();
//# sourceMappingURL=category.controller.js.map