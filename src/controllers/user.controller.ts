import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/error.middleware';
import userService from '../services/user.service';
import { sendSuccess, sendCreated } from '../utils/response.util';
import { createUserSchema } from '../validators';

export class UserController {
  /**
   * Create or update user (upsert)
   * POST /api/users
   */
  upsertUser = asyncHandler(async (req: Request, res: Response) => {
    const data = createUserSchema.parse(req.body);
    const user = await userService.upsertUser(data);
    return sendCreated(res, user, 'User created/updated successfully');
  });

  /**
   * Get user by ID
   * GET /api/users/:id
   */
  getUser = asyncHandler(async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const user = await userService.getUserById(userId);
    return sendSuccess(res, user);
  });

  /**
   * Get user by Telegram ID
   * GET /api/users/telegram/:telegramId
   */
  getUserByTelegramId = asyncHandler(async (req: Request, res: Response) => {
    const telegramId = req.params.telegramId;
    const user = await userService.getUserByTelegramId(telegramId);
    return sendSuccess(res, user);
  });

  /**
   * Get current user
   * GET /api/users/me
   */
  getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const fullUser = await userService.getUserById(user.id);
    return sendSuccess(res, fullUser);
  });

  /**
   * Ban user (Admin only)
   * POST /api/users/:id/ban
   */
  banUser = asyncHandler(async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const user = await userService.banUser(userId);
    return sendSuccess(res, user, 'User banned successfully');
  });

  /**
   * Unban user (Admin only)
   * POST /api/users/:id/unban
   */
  unbanUser = asyncHandler(async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const user = await userService.unbanUser(userId);
    return sendSuccess(res, user, 'User unbanned successfully');
  });
}

export default new UserController();
