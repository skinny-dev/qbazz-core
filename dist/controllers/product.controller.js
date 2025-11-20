"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const error_middleware_1 = require("../middleware/error.middleware");
const product_service_1 = __importDefault(require("../services/product.service"));
const response_util_1 = require("../utils/response.util");
const validators_1 = require("../validators");
class ProductController {
    constructor() {
        /**
         * Create product (from Telegram bot)
         * POST /api/products
         */
        this.createProduct = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const data = validators_1.createProductSchema.parse(req.body);
            const product = await product_service_1.default.createProduct(data);
            return (0, response_util_1.sendCreated)(res, product, 'Product created successfully');
        });
        /**
         * Update product
         * PUT /api/products/:id
         */
        this.updateProduct = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const productId = parseInt(req.params.id);
            const data = validators_1.updateProductSchema.parse(req.body);
            const product = await product_service_1.default.updateProduct(productId, data);
            return (0, response_util_1.sendSuccess)(res, product, 'Product updated successfully');
        });
        /**
         * Delete product
         * DELETE /api/products/:id
         */
        this.deleteProduct = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const productId = parseInt(req.params.id);
            await product_service_1.default.deleteProduct(productId);
            return (0, response_util_1.sendSuccess)(res, { id: productId }, 'Product deleted successfully');
        });
        /**
         * Publish product
         * POST /api/products/:id/publish
         */
        this.publishProduct = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const productId = parseInt(req.params.id);
            const product = await product_service_1.default.publishProduct(productId);
            return (0, response_util_1.sendSuccess)(res, product, 'Product published successfully');
        });
        /**
         * Unpublish product
         * POST /api/products/:id/unpublish
         */
        this.unpublishProduct = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const productId = parseInt(req.params.id);
            const product = await product_service_1.default.unpublishProduct(productId);
            return (0, response_util_1.sendSuccess)(res, product, 'Product unpublished');
        });
        /**
         * Get product by ID
         * GET /api/products/:id
         */
        this.getProduct = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const productId = parseInt(req.params.id);
            const product = await product_service_1.default.getProductById(productId);
            return (0, response_util_1.sendSuccess)(res, product);
        });
        /**
         * Get product by slug
         * GET /api/products/slug/:slug
         */
        this.getProductBySlug = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const slug = req.params.slug;
            const product = await product_service_1.default.getProductBySlug(slug);
            return (0, response_util_1.sendSuccess)(res, product);
        });
        /**
         * List products
         * GET /api/products
         */
        this.listProducts = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const { page, limit, storeId, categoryId, search, isPublished, isFeatured } = req.query;
            const result = await product_service_1.default.listProducts({
                page: page ? parseInt(page) : undefined,
                limit: limit ? parseInt(limit) : undefined,
                storeId: storeId ? parseInt(storeId) : undefined,
                categoryId: categoryId ? parseInt(categoryId) : undefined,
                search: search,
                isPublished: isPublished === 'true' ? true : isPublished === 'false' ? false : undefined,
                isFeatured: isFeatured === 'true' ? true : isFeatured === 'false' ? false : undefined,
            });
            return (0, response_util_1.sendSuccess)(res, result.products, 'Products retrieved successfully', 200, result.meta);
        });
        /**
         * Get products by store
         * GET /api/stores/:storeId/products
         */
        this.getProductsByStore = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const storeId = parseInt(req.params.storeId);
            const { page, limit } = req.query;
            const result = await product_service_1.default.getProductsByStore(storeId, page ? parseInt(page) : undefined, limit ? parseInt(limit) : undefined);
            return (0, response_util_1.sendSuccess)(res, result.products, 'Store products retrieved', 200, result.meta);
        });
        /**
         * Search products
         * GET /api/products/search
         */
        this.searchProducts = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const { q, page, limit } = req.query;
            if (!q) {
                return (0, response_util_1.sendSuccess)(res, [], 'No search query provided');
            }
            const result = await product_service_1.default.searchProducts(q, page ? parseInt(page) : undefined, limit ? parseInt(limit) : undefined);
            return (0, response_util_1.sendSuccess)(res, result.products, 'Search results retrieved', 200, result.meta);
        });
    }
}
exports.ProductController = ProductController;
exports.default = new ProductController();
//# sourceMappingURL=product.controller.js.map