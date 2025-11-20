import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/error.middleware';
import storeService from '../services/store.service';
import telegramService from '../services/telegram.service';
import { sendSuccess, sendCreated, sendError } from '../utils/response.util';
import { createStoreSchema, updateStoreSchema } from '../validators';
import prisma from '../config/database';

export class StoreController {
  /**
   * Create store (User or Admin)
   * POST /api/stores
   */
  createStore = asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const data = createStoreSchema.parse(req.body);

    try {
      const store = await storeService.createStore(user.id, data);

      // Send store data back to Telegram bot
      await telegramService.sendStoreDataToBot(store);

      // Notify admins for approval
      const categories = (store as any).storeCategories?.map((sc: any) => sc.category.title) || [];
      await telegramService.notifyAdminsAboutNewStore({
        id: store.id,
        title: store.title,
        ownerTelegramId: user.telegramId,
        ownerName: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
        categoryNames: categories,
      });

      return sendCreated(res, store, 'Store created successfully and sent for approval');
    } catch (error: any) {
      // Send error back to Telegram bot
      await telegramService.sendErrorToBot(user.telegramId, error.message);
      throw error;
    }
  });

  /**
   * Approve store (Admin only)
   * POST /api/stores/:id/approve
   */
  approveStore = asyncHandler(async (req: Request, res: Response) => {
    const admin = (req as any).admin;
    const storeId = parseInt(req.params.id);

    const store = await storeService.approveStore(storeId, admin.id);

    // Note: Notifications are handled by the Telegram bot after receiving the API response

    return sendSuccess(res, store, 'Store approved successfully');
  });

  /**
   * Reject store (Admin only)
   * POST /api/stores/:id/reject
   */
  rejectStore = asyncHandler(async (req: Request, res: Response) => {
    const admin = (req as any).admin;
    const storeId = parseInt(req.params.id);
    const { reason } = req.body;

    if (!reason) {
      return sendError(res, 'Rejection reason is required', 400);
    }

    const store = await storeService.rejectStore(storeId, admin.id, reason);

    // Note: Notifications are handled by the Telegram bot after receiving the API response

    return sendSuccess(res, store, 'Store rejected');
  });

  /**
   * Update store
   * PUT /api/stores/:id
   */
  updateStore = asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const admin = (req as any).admin;
    const storeId = parseInt(req.params.id);
    const data = updateStoreSchema.parse(req.body);

    const store = await storeService.updateStore(storeId, user?.id || admin.id, data, !!admin);

    // Notify store owner if updated by admin
    if (admin) {
      const owner = store.user;
      await telegramService.notifyStoreUpdate({
        ownerTelegramId: owner.telegramId,
        title: store.title,
        updatedFields: Object.keys(data),
      });
    }

    return sendSuccess(res, store, 'Store updated successfully');
  });

  /**
   * Delete store
   * DELETE /api/stores/:id
   */
  deleteStore = asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const admin = (req as any).admin;
    const storeId = parseInt(req.params.id);

    const store = await storeService.deleteStore(storeId, user?.id || admin.id, !!admin);

    // Notify store owner (fetch user separately)
    const owner = await prisma.user.findUnique({ where: { id: store.userId } });
    if (owner) {
      await telegramService.notifyStoreDeletion({
        ownerTelegramId: owner.telegramId,
        title: store.title,
        reason: req.body.reason,
      });
    }

    return sendSuccess(res, { id: storeId }, 'Store deleted successfully');
  });

  /**
   * Get store by ID
   * GET /api/stores/:id
   */
  getStore = asyncHandler(async (req: Request, res: Response) => {
    const storeId = parseInt(req.params.id);
    const store = await storeService.getStoreById(storeId);
    return sendSuccess(res, store);
  });

  /**
   * Get store by slug
   * GET /api/stores/slug/:slug
   */
  getStoreBySlug = asyncHandler(async (req: Request, res: Response) => {
    const slug = req.params.slug;
    const store = await storeService.getStoreBySlug(slug);
    return sendSuccess(res, store);
  });

  /**
   * List stores
   * GET /api/stores
   */
  listStores = asyncHandler(async (req: Request, res: Response) => {
    const { page, limit, categoryId, isApproved, search } = req.query;

    const result = await storeService.listStores({
      page: page ? parseInt(page as string) : undefined,
      limit: limit ? parseInt(limit as string) : undefined,
      categoryId: categoryId ? parseInt(categoryId as string) : undefined,
      isApproved: isApproved === 'true' ? true : isApproved === 'false' ? false : undefined,
      search: search as string,
    });

    return sendSuccess(res, result.stores, 'Stores retrieved successfully', 200, result.meta);
  });

  /**
   * Get pending stores (Admin only)
   * GET /api/stores/pending
   */
  getPendingStores = asyncHandler(async (req: Request, res: Response) => {
    const { page, limit } = req.query;

    const result = await storeService.getPendingStores(
      page ? parseInt(page as string) : undefined,
      limit ? parseInt(limit as string) : undefined
    );

    return sendSuccess(res, result.stores, 'Pending stores retrieved', 200, result.meta);
  });
}

export default new StoreController();
