import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/error.middleware';
import categoryService from '../services/category.service';
import { sendSuccess, sendCreated } from '../utils/response.util';
import { createCategorySchema, updateCategorySchema } from '../validators';

export class CategoryController {
  /**
   * Create category (Admin only)
   * POST /api/categories
   */
  createCategory = asyncHandler(async (req: Request, res: Response) => {
    const data = createCategorySchema.parse(req.body);
    const category = await categoryService.createCategory(data);
    return sendCreated(res, category, 'Category created successfully');
  });

  /**
   * Update category (Admin only)
   * PUT /api/categories/:id
   */
  updateCategory = asyncHandler(async (req: Request, res: Response) => {
    const categoryId = parseInt(req.params.id);
    const data = updateCategorySchema.parse(req.body);
    const category = await categoryService.updateCategory(categoryId, data);
    return sendSuccess(res, category, 'Category updated successfully');
  });

  /**
   * Delete category (Admin only)
   * DELETE /api/categories/:id
   */
  deleteCategory = asyncHandler(async (req: Request, res: Response) => {
    const categoryId = parseInt(req.params.id);
    await categoryService.deleteCategory(categoryId);
    return sendSuccess(res, { id: categoryId }, 'Category deleted successfully');
  });

  /**
   * Get category by ID
   * GET /api/categories/:id
   */
  getCategory = asyncHandler(async (req: Request, res: Response) => {
    const categoryId = parseInt(req.params.id);
    const category = await categoryService.getCategoryById(categoryId);
    return sendSuccess(res, category);
  });

  /**
   * Get category by slug
   * GET /api/categories/slug/:slug
   */
  getCategoryBySlug = asyncHandler(async (req: Request, res: Response) => {
    const slug = req.params.slug;
    const category = await categoryService.getCategoryBySlug(slug);
    return sendSuccess(res, category);
  });

  /**
   * List all categories
   * GET /api/categories
   */
  listCategories = asyncHandler(async (req: Request, res: Response) => {
    const { page, limit, parentId } = req.query;

    const result = await categoryService.listCategories({
      page: page ? parseInt(page as string) : undefined,
      limit: limit ? parseInt(limit as string) : undefined,
      parentId: parentId ? parseInt(parentId as string) : parentId === 'null' ? null : undefined,
    });

    return sendSuccess(
      res,
      result.categories,
      'Categories retrieved successfully',
      200,
      result.meta
    );
  });

  /**
   * Get root categories
   * GET /api/categories/root
   */
  getRootCategories = asyncHandler(async (_req: Request, res: Response) => {
    const categories = await categoryService.getRootCategories();
    return sendSuccess(res, categories, 'Root categories retrieved');
  });

  /**
   * Get category tree
   * GET /api/categories/tree
   */
  getCategoryTree = asyncHandler(async (_req: Request, res: Response) => {
    const tree = await categoryService.getCategoryTree();
    return sendSuccess(res, tree, 'Category tree retrieved');
  });
}

export default new CategoryController();
