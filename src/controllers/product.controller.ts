import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/error.middleware';
import productService from '../services/product.service';
import { sendSuccess, sendCreated } from '../utils/response.util';
import { createProductSchema, updateProductSchema } from '../validators';

export class ProductController {
  /**
   * Create product (from Telegram bot)
   * POST /api/products
   */
  createProduct = asyncHandler(async (req: Request, res: Response) => {
    const data = createProductSchema.parse(req.body);
    const product = await productService.createProduct(data);
    return sendCreated(res, product, 'Product created successfully');
  });

  /**
   * Update product
   * PUT /api/products/:id
   */
  updateProduct = asyncHandler(async (req: Request, res: Response) => {
    const productId = parseInt(req.params.id);
    const data = updateProductSchema.parse(req.body);
    const product = await productService.updateProduct(productId, data);
    return sendSuccess(res, product, 'Product updated successfully');
  });

  /**
   * Delete product
   * DELETE /api/products/:id
   */
  deleteProduct = asyncHandler(async (req: Request, res: Response) => {
    const productId = parseInt(req.params.id);
    await productService.deleteProduct(productId);
    return sendSuccess(res, { id: productId }, 'Product deleted successfully');
  });

  /**
   * Publish product
   * POST /api/products/:id/publish
   */
  publishProduct = asyncHandler(async (req: Request, res: Response) => {
    const productId = parseInt(req.params.id);
    const product = await productService.publishProduct(productId);
    return sendSuccess(res, product, 'Product published successfully');
  });

  /**
   * Unpublish product
   * POST /api/products/:id/unpublish
   */
  unpublishProduct = asyncHandler(async (req: Request, res: Response) => {
    const productId = parseInt(req.params.id);
    const product = await productService.unpublishProduct(productId);
    return sendSuccess(res, product, 'Product unpublished');
  });

  /**
   * Get product by ID
   * GET /api/products/:id
   */
  getProduct = asyncHandler(async (req: Request, res: Response) => {
    const productId = parseInt(req.params.id);
    const product = await productService.getProductById(productId);
    return sendSuccess(res, product);
  });

  /**
   * Get product by slug
   * GET /api/products/slug/:slug
   */
  getProductBySlug = asyncHandler(async (req: Request, res: Response) => {
    const slug = req.params.slug;
    const product = await productService.getProductBySlug(slug);
    return sendSuccess(res, product);
  });

  /**
   * List products
   * GET /api/products
   */
  listProducts = asyncHandler(async (req: Request, res: Response) => {
    const { page, limit, storeId, categoryId, search, isPublished, isFeatured } = req.query;

    const result = await productService.listProducts({
      page: page ? parseInt(page as string) : undefined,
      limit: limit ? parseInt(limit as string) : undefined,
      storeId: storeId ? parseInt(storeId as string) : undefined,
      categoryId: categoryId ? parseInt(categoryId as string) : undefined,
      search: search as string,
      isPublished: isPublished === 'true' ? true : isPublished === 'false' ? false : undefined,
      isFeatured: isFeatured === 'true' ? true : isFeatured === 'false' ? false : undefined,
    });

    return sendSuccess(res, result.products, 'Products retrieved successfully', 200, result.meta);
  });

  /**
   * Get products by store
   * GET /api/stores/:storeId/products
   */
  getProductsByStore = asyncHandler(async (req: Request, res: Response) => {
    const storeId = parseInt(req.params.storeId);
    const { page, limit } = req.query;

    const result = await productService.getProductsByStore(
      storeId,
      page ? parseInt(page as string) : undefined,
      limit ? parseInt(limit as string) : undefined
    );

    return sendSuccess(res, result.products, 'Store products retrieved', 200, result.meta);
  });

  /**
   * Search products
   * GET /api/products/search
   */
  searchProducts = asyncHandler(async (req: Request, res: Response) => {
    const { q, page, limit } = req.query;

    if (!q) {
      return sendSuccess(res, [], 'No search query provided');
    }

    const result = await productService.searchProducts(
      q as string,
      page ? parseInt(page as string) : undefined,
      limit ? parseInt(limit as string) : undefined
    );

    return sendSuccess(res, result.products, 'Search results retrieved', 200, result.meta);
  });
}

export default new ProductController();
