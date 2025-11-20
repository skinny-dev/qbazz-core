import { Request, Response } from 'express';
export declare class UserController {
    /**
     * Create or update user (upsert)
     * POST /api/users
     */
    upsertUser: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get user by ID
     * GET /api/users/:id
     */
    getUser: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get user by Telegram ID
     * GET /api/users/telegram/:telegramId
     */
    getUserByTelegramId: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Get current user
     * GET /api/users/me
     */
    getCurrentUser: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Ban user (Admin only)
     * POST /api/users/:id/ban
     */
    banUser: (req: Request, res: Response, next: import("express").NextFunction) => void;
    /**
     * Unban user (Admin only)
     * POST /api/users/:id/unban
     */
    unbanUser: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
declare const _default: UserController;
export default _default;
//# sourceMappingURL=user.controller.d.ts.map