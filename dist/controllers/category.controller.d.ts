import { Request, Response } from 'express';
export declare class CategoryController {
    /**
     * Create category (Admin only)
     * POST /api/categories
     */
    createCategory: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Update category (Admin only)
     * PUT /api/categories/:id
     */
    updateCategory: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Delete category (Admin only)
     * DELETE /api/categories/:id
     */
    deleteCategory: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get category by ID
     * GET /api/categories/:id
     */
    getCategory: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get category by slug
     * GET /api/categories/slug/:slug
     */
    getCategoryBySlug: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * List all categories
     * GET /api/categories
     */
    listCategories: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get root categories
     * GET /api/categories/root
     */
    getRootCategories: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get category tree
     * GET /api/categories/tree
     */
    getCategoryTree: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
declare const _default: CategoryController;
export default _default;
//# sourceMappingURL=category.controller.d.ts.map