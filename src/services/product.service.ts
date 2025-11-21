import prisma from '../config/database';
import { NotFoundError, ConflictError } from '../utils/errors.util';
import { generateSlug, getPaginationParams, getPaginationMeta } from '../utils/helpers.util';
import { CreateProductInput, UpdateProductInput } from '../validators';

export class ProductService {
  /**
   * Create a new product (from Telegram bot data)
   */
  async createProduct(data: CreateProductInput) {
    // Verify store exists
    const store = await prisma.store.findUnique({
      where: { id: data.storeId },
    });

    if (!store) {
      throw new NotFoundError('Store not found');
    }

    if (!store.isApproved) {
      throw new ConflictError('Store must be approved before adding products');
    }

    // Generate unique slug
    const slug = generateSlug(data.title, Date.now().toString(36));

    // Create product
    const product = await prisma.product.create({
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

    await prisma.store.update({
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
  async updateProduct(productId: number, data: UpdateProductInput) {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    const updateData: any = {};

    if (data.title) updateData.title = data.title;
    if (data.description) updateData.description = data.description;
    if (data.longDescription) updateData.longDescription = data.longDescription;
    if (data.properties) updateData.properties = data.properties;
    if (data.pricing) updateData.pricing = data.pricing;
    if (data.colors) updateData.colors = data.colors;
    if (data.colorVariations) updateData.colorVariations = data.colorVariations;
    if (data.availability) updateData.availability = data.availability;
    if (data.stockQuantity !== undefined) updateData.stockQuantity = data.stockQuantity;
    if (data.brand) updateData.brand = data.brand;
    if (data.manufacturer) updateData.manufacturer = data.manufacturer;
    if (data.condition) updateData.condition = data.condition;
    if (data.tags) updateData.tags = data.tags;
    if (data.images) updateData.images = data.images;
    if (data.sourceMetadata) updateData.sourceMetadata = data.sourceMetadata;
    if (data.categoryId) updateData.categoryId = data.categoryId;

    const updatedProduct = await prisma.product.update({
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
  async deleteProduct(productId: number) {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { store: true },
    });

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    // Soft delete
    const deletedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    // Update store product count
    const store = product.store;
    await prisma.store.update({
      where: { id: store.id },
      data: {
        stats: {
          ...(store.stats as any),
          products: Math.max(0, ((store.stats as any)?.products || 0) - 1),
        },
      },
    });

    return deletedProduct;
  }

  /**
   * Publish product
   */
  async publishProduct(productId: number) {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    const publishedProduct = await prisma.product.update({
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
  async unpublishProduct(productId: number) {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    const unpublishedProduct = await prisma.product.update({
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
  async getProductById(productId: number) {
    const product = await prisma.product.findUnique({
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
      throw new NotFoundError('Product not found');
    }

    // Increment view count
    await prisma.product.update({
      where: { id: productId },
      data: {
        stats: {
          ...(product.stats as any),
          views: ((product.stats as any)?.views || 0) + 1,
        },
      },
    });

    return product;
  }

  /**
   * Get product by slug
   */
  async getProductBySlug(slug: string) {
    const product = await prisma.product.findUnique({
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
      throw new NotFoundError('Product not found');
    }

    return product;
  }

  /**
   * List products with pagination and filters
   */
  async listProducts(params: {
    page?: number;
    limit?: number;
    storeId?: number;
    categoryId?: number;
    search?: string;
    isPublished?: boolean;
    isFeatured?: boolean;
  }) {
    const { skip, take, page, limit } = getPaginationParams(params.page, params.limit);

    const where: any = {
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
      prisma.product.findMany({
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
      prisma.product.count({ where }),
    ]);

    const meta = getPaginationMeta(total, page, limit);

    return { products, meta };
  }

  /**
   * Get products by store
   */
  async getProductsByStore(storeId: number, page?: number, limit?: number) {
    return this.listProducts({ page, limit, storeId, isPublished: true });
  }

  /**
   * Search products (public endpoint)
   */
  async searchProducts(query: string, page?: number, limit?: number) {
    return this.listProducts({ page, limit, search: query, isPublished: true });
  }
}

export default new ProductService();
