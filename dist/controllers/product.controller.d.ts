import { Request, Response } from 'express';
export declare class ProductController {
    /**
     * Create product (from Telegram bot)
     * POST /api/products
     */
    createProduct: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Update product
     * PUT /api/products/:id
     */
    updateProduct: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Delete product
     * DELETE /api/products/:id
     */
    deleteProduct: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Publish product
     * POST /api/products/:id/publish
     */
    publishProduct: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Unpublish product
     * POST /api/products/:id/unpublish
     */
    unpublishProduct: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get product by ID
     * GET /api/products/:id
     */
    getProduct: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get product by slug
     * GET /api/products/slug/:slug
     */
    getProductBySlug: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * List products
     * GET /api/products
     */
    listProducts: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get products by store
     * GET /api/stores/:storeId/products
     */
    getProductsByStore: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Search products
     * GET /api/products/search
     */
    searchProducts: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
declare const _default: ProductController;
export default _default;
//# sourceMappingURL=product.controller.d.ts.map