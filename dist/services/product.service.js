"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const database_1 = __importDefault(require("../config/database"));
const errors_util_1 = require("../utils/errors.util");
const helpers_util_1 = require("../utils/helpers.util");
class ProductService {
    /**
     * Create a new product (from Telegram bot data)
     */
    async createProduct(data) {
        // Verify store exists
        const store = await database_1.default.store.findUnique({
            where: { id: data.storeId },
        });
        if (!store) {
            throw new errors_util_1.NotFoundError('Store not found');
        }
        if (!store.isApproved) {
            throw new errors_util_1.ConflictError('Store must be approved before adding products');
        }
        // Generate unique slug
        const slug = (0, helpers_util_1.generateSlug)(data.title, Date.now().toString(36));
        // Create product
        const product = await database_1.default.product.create({
            data: {
                storeId: data.storeId,
                categoryId: data.categoryId,
                title: data.title,
                slug,
                description: data.description,
                longDescription: data.longDescription,
                properties: JSON.stringify(data.properties),
                pricing: JSON.stringify(data.pricing),
                colors: JSON.stringify(data.colors || []),
                colorVariations: JSON.stringify(data.colorVariations),
                features: JSON.stringify([]),
                benefits: JSON.stringify([]),
                availability: data.availability,
                stockQuantity: data.stockQuantity,
                brand: data.brand,
                manufacturer: data.manufacturer,
                condition: data.condition,
                tags: JSON.stringify(data.tags || []),
                images: JSON.stringify(data.images),
                sourceMetadata: JSON.stringify(data.sourceMetadata),
                seoTitle: data.title,
                seoDescription: data.description || data.title,
                seoKeywords: JSON.stringify(data.tags || []),
                isPublished: store.settings ? JSON.parse(store.settings).autoPublish || false : false,
                stats: JSON.stringify({
                    views: 0,
                    clicks: 0,
                    likes: 0,
                    shares: 0,
                }),
            },
            include: {
                store: true,
                category: true,
            },
        });
        // Update store product count
        const currentStats = store.stats
            ? typeof store.stats === 'string'
                ? JSON.parse(store.stats)
                : store.stats
            : { views: 0, clicks: 0, products: 0, orders: 0 };
        await database_1.default.store.update({
            where: { id: data.storeId },
            data: {
                stats: JSON.stringify({
                    ...currentStats,
                    products: (currentStats.products || 0) + 1,
                }),
            },
        });
        return product;
    }
    /**
     * Update product
     */
    async updateProduct(productId, data) {
        const product = await database_1.default.product.findUnique({
            where: { id: productId },
        });
        if (!product) {
            throw new errors_util_1.NotFoundError('Product not found');
        }
        const updateData = {};
        if (data.title)
            updateData.title = data.title;
        if (data.description)
            updateData.description = data.description;
        if (data.longDescription)
            updateData.longDescription = data.longDescription;
        if (data.properties)
            updateData.properties = data.properties;
        if (data.pricing)
            updateData.pricing = data.pricing;
        if (data.colors)
            updateData.colors = data.colors;
        if (data.colorVariations)
            updateData.colorVariations = data.colorVariations;
        if (data.availability)
            updateData.availability = data.availability;
        if (data.stockQuantity !== undefined)
            updateData.stockQuantity = data.stockQuantity;
        if (data.brand)
            updateData.brand = data.brand;
        if (data.manufacturer)
            updateData.manufacturer = data.manufacturer;
        if (data.condition)
            updateData.condition = data.condition;
        if (data.tags)
            updateData.tags = data.tags;
        if (data.images)
            updateData.images = data.images;
        if (data.sourceMetadata)
            updateData.sourceMetadata = data.sourceMetadata;
        if (data.categoryId)
            updateData.categoryId = data.categoryId;
        const updatedProduct = await database_1.default.product.update({
            where: { id: productId },
            data: updateData,
            include: {
                store: true,
                category: true,
            },
        });
        return updatedProduct;
    }
    /**
     * Delete product (soft delete)
     */
    async deleteProduct(productId) {
        const product = await database_1.default.product.findUnique({
            where: { id: productId },
            include: { store: true },
        });
        if (!product) {
            throw new errors_util_1.NotFoundError('Product not found');
        }
        // Soft delete
        const deletedProduct = await database_1.default.product.update({
            where: { id: productId },
            data: {
                isDeleted: true,
                deletedAt: new Date(),
            },
        });
        // Update store product count
        const store = product.store;
        await database_1.default.store.update({
            where: { id: store.id },
            data: {
                stats: {
                    ...store.stats,
                    products: Math.max(0, (store.stats?.products || 0) - 1),
                },
            },
        });
        return deletedProduct;
    }
    /**
     * Publish product
     */
    async publishProduct(productId) {
        const product = await database_1.default.product.findUnique({
            where: { id: productId },
        });
        if (!product) {
            throw new errors_util_1.NotFoundError('Product not found');
        }
        const publishedProduct = await database_1.default.product.update({
            where: { id: productId },
            data: {
                isPublished: true,
                publishedAt: new Date(),
            },
        });
        return publishedProduct;
    }
    /**
     * Unpublish product
     */
    async unpublishProduct(productId) {
        const product = await database_1.default.product.findUnique({
            where: { id: productId },
        });
        if (!product) {
            throw new errors_util_1.NotFoundError('Product not found');
        }
        const unpublishedProduct = await database_1.default.product.update({
            where: { id: productId },
            data: {
                isPublished: false,
            },
        });
        return unpublishedProduct;
    }
    /**
     * Get product by ID
     */
    async getProductById(productId) {
        const product = await database_1.default.product.findUnique({
            where: { id: productId },
            include: {
                store: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                telegramId: true,
                                telegramUsername: true,
                            },
                        },
                    },
                },
                category: true,
            },
        });
        if (!product) {
            throw new errors_util_1.NotFoundError('Product not found');
        }
        // Increment view count
        await database_1.default.product.update({
            where: { id: productId },
            data: {
                stats: {
                    ...product.stats,
                    views: (product.stats?.views || 0) + 1,
                },
            },
        });
        return product;
    }
    /**
     * Get product by slug
     */
    async getProductBySlug(slug) {
        const product = await database_1.default.product.findUnique({
            where: { slug },
            include: {
                store: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                telegramId: true,
                                telegramUsername: true,
                            },
                        },
                    },
                },
                category: true,
            },
        });
        if (!product) {
            throw new errors_util_1.NotFoundError('Product not found');
        }
        return product;
    }
    /**
     * List products with pagination and filters
     */
    async listProducts(params) {
        const { skip, take, page, limit } = (0, helpers_util_1.getPaginationParams)(params.page, params.limit);
        const where = {
            isDeleted: false,
        };
        if (params.isPublished !== undefined) {
            where.isPublished = params.isPublished;
        }
        if (params.isFeatured !== undefined) {
            where.isFeatured = params.isFeatured;
        }
        if (params.storeId) {
            where.storeId = params.storeId;
        }
        if (params.categoryId) {
            where.categoryId = params.categoryId;
        }
        if (params.search) {
            where.OR = [
                { title: { contains: params.search, mode: 'insensitive' } },
                { description: { contains: params.search, mode: 'insensitive' } },
                { tags: { has: params.search } },
            ];
        }
        const [products, total] = await Promise.all([
            database_1.default.product.findMany({
                where,
                skip,
                take,
                include: {
                    store: {
                        select: {
                            id: true,
                            title: true,
                            slug: true,
                            avatar: true,
                        },
                    },
                    category: true,
                },
                orderBy: { createdAt: 'desc' },
            }),
            database_1.default.product.count({ where }),
        ]);
        const meta = (0, helpers_util_1.getPaginationMeta)(total, page, limit);
        return { products, meta };
    }
    /**
     * Get products by store
     */
    async getProductsByStore(storeId, page, limit) {
        return this.listProducts({ page, limit, storeId, isPublished: true });
    }
    /**
     * Search products (public endpoint)
     */
    async searchProducts(query, page, limit) {
        return this.listProducts({ page, limit, search: query, isPublished: true });
    }
}
exports.ProductService = ProductService;
exports.default = new ProductService();
//# sourceMappingURL=product.service.js.map