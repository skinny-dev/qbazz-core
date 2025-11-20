import { Request, Response } from 'express';
export declare class StoreController {
    /**
     * Create store (User or Admin)
     * POST /api/stores
     */
    createStore: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Approve store (Admin only)
     * POST /api/stores/:id/approve
     */
    approveStore: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Reject store (Admin only)
     * POST /api/stores/:id/reject
     */
    rejectStore: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Update store
     * PUT /api/stores/:id
     */
    updateStore: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Delete store
     * DELETE /api/stores/:id
     */
    deleteStore: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get store by ID
     * GET /api/stores/:id
     */
    getStore: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get store by slug
     * GET /api/stores/slug/:slug
     */
    getStoreBySlug: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * List stores
     * GET /api/stores
     */
    listStores: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get pending stores (Admin only)
     * GET /api/stores/pending
     */
    getPendingStores: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
declare const _default: StoreController;
export default _default;
//# sourceMappingURL=store.controller.d.ts.map