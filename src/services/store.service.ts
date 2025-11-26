import prisma from '../config/database';
import { NotFoundError, ConflictError } from '../utils/errors.util';
import { generateSlug, getPaginationParams, getPaginationMeta } from '../utils/helpers.util';
import { generateStoreQRCode } from '../utils/qrcode.util';
import { CreateStoreInput, UpdateStoreInput } from '../validators';

export class StoreService {
  /**
   * Create a new store
   */
  async createStore(userId: number, data: CreateStoreInput) {
    // Check if user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundError('User not found');
    }

    // Check if national code is already used
    const existingStore = await prisma.store.findFirst({
      where: {
        identity: {
          contains: data.identity.nationalCode,
        },
      },
    });

    if (existingStore) {
      throw new ConflictError('Store with this national code already exists');
    }

    // Check if telegram channel ID is already used (simplified for SQLite)
    // Note: Full JSON query not available in SQLite, would need custom validation
    const allStores = await prisma.store.findMany();
    const existingTelegramStore = allStores.find((s) => {
      try {
        const socials = JSON.parse(s.socials);
        return socials?.telegram?.id === data.socials.telegram.id;
      } catch {
        return false;
      }
    });

    if (existingTelegramStore) {
      throw new ConflictError('Store with this Telegram channel is already registered');
    }

    // Generate slug
    const slug = generateSlug(data.title, Date.now().toString(36));

    // Create store
    const store = await prisma.store.create({
      data: {
        userId,
        title: data.title,
        slug,
        description: data.description,
        longDescription: data.longDescription,
        socials: JSON.stringify(data.socials),
        identity: JSON.stringify(data.identity),
        avatar: data.avatar,
        coverImage: data.coverImage,
        tags: JSON.stringify(data.tags || []),
        isApproved: false,
        isActive: true,
        seoTitle: data.title,
        seoDescription: data.description,
        seoKeywords: JSON.stringify(data.tags || []),
        stats: JSON.stringify({
          views: 0,
          clicks: 0,
          products: 0,
          orders: 0,
        }),
        settings: JSON.stringify({
          autoPublish: false,
          allowReviews: true,
          showContact: true,
          languages: ['fa'],
        }),
        storeCategories: {
          create: data.categoryIds.map((categoryId, index) => ({
            categoryId,
            isPrimary: index === 0,
          })),
        },
      },
      include: {
        user: true,
        storeCategories: {
          include: {
            category: true,
          },
        },
      },
    });

    // Log store creation action
    await prisma.storeAction.create({
      data: {
        storeId: store.id,
        actionType: 'CREATED',
        description: `Store "${store.title}" was created by user ${user.telegramId}`,
        metadata: JSON.stringify({
          userId: user.id,
          telegramId: user.telegramId,
        }),
      },
    });

    return store;
  }

  /**
   * Approve store (Admin only)
   */
  async approveStore(storeId: number, adminId: number) {
    const store = await prisma.store.findUnique({
      where: { id: storeId },
      include: {
        user: true,
      },
    });

    if (!store) {
      throw new NotFoundError('Store not found');
    }

    if (store.isApproved) {
      throw new ConflictError('Store is already approved');
    }

    // Parse socials JSON string
    // Generate QR Code after approval
    const socials = JSON.parse(store.socials);
    const channelIdentifier = socials.telegram.username || socials.telegram.id;
    const qrCode = await generateStoreQRCode({
      telegramId: channelIdentifier,
      slug: store.slug,
    });

    // Update store
    const updatedStore = await prisma.store.update({
      where: { id: storeId },
      data: {
        isApproved: true,
        approvedAt: new Date(),
        approvedById: adminId,
        qrCode: JSON.stringify(qrCode),
      },
      include: {
        user: true,
        approvedBy: true,
      },
    });

    // Log approval action
    await prisma.storeAction.create({
      data: {
        storeId: store.id,
        adminId,
        actionType: 'APPROVED',
        description: `Store "${store.title}" was approved`,
      },
    });

    // Note: QR code notifications are handled by the Telegram bot
    // The bot fetches the updated store data (including qrCode) and sends it to both owner and admin

    return updatedStore;
  }

  /**
   * Reject store (Admin only)
   */
  async rejectStore(storeId: number, adminId: number, reason: string) {
    const store = await prisma.store.findUnique({
      where: { id: storeId },
    });

    if (!store) {
      throw new NotFoundError('Store not found');
    }

    const updatedStore = await prisma.store.update({
      where: { id: storeId },
      data: {
        isApproved: false,
        rejectionReason: reason,
      },
    });

    // Log rejection action
    await prisma.storeAction.create({
      data: {
        storeId: store.id,
        adminId,
        actionType: 'REJECTED',
        description: `Store "${store.title}" was rejected: ${reason}`,
        metadata: JSON.stringify({ reason }),
      },
    });

    return updatedStore;
  }

  /**
   * Update store
   */
  async updateStore(storeId: number, userId: number, data: UpdateStoreInput, isAdmin = false) {
    const store = await prisma.store.findUnique({
      where: { id: storeId },
    });

    if (!store) {
      throw new NotFoundError('Store not found');
    }

    // Check ownership
    if (!isAdmin && store.userId !== userId) {
      throw new ConflictError('You do not have permission to update this store');
    }

    const updateData: any = {};

    if (data.title) updateData.title = data.title;
    if (data.description) updateData.description = data.description;
    if (data.longDescription) updateData.longDescription = data.longDescription;
    if (data.socials) updateData.socials = data.socials;
    if (data.identity) updateData.identity = data.identity;
    if (data.avatar) updateData.avatar = data.avatar;
    if (data.coverImage) updateData.coverImage = data.coverImage;
    if (data.tags) updateData.tags = data.tags;

    const updatedStore = await prisma.store.update({
      where: { id: storeId },
      data: updateData,
      include: {
        user: true,
        storeCategories: {
          include: {
            category: true,
          },
        },
      },
    });

    // Log update action
    await prisma.storeAction.create({
      data: {
        storeId: store.id,
        adminId: isAdmin ? userId : null,
        actionType: 'UPDATED',
        description: `Store "${store.title}" was updated`,
        metadata: JSON.stringify({ updatedFields: Object.keys(updateData) }),
      },
    });

    return updatedStore;
  }

  /**
   * Delete store
   */
  async deleteStore(storeId: number, userId: number, isAdmin = false) {
    const store = await prisma.store.findUnique({
      where: { id: storeId },
      include: { user: true },
    });

    if (!store) {
      throw new NotFoundError('Store not found');
    }

    // Check ownership
    if (!isAdmin && store.userId !== userId) {
      throw new ConflictError('You do not have permission to delete this store');
    }

    // Soft delete by setting isActive to false
    const deletedStore = await prisma.store.update({
      where: { id: storeId },
      data: { isActive: false },
    });

    // Log deletion action
    await prisma.storeAction.create({
      data: {
        storeId: store.id,
        adminId: isAdmin ? userId : null,
        actionType: 'DELETED',
        description: `Store "${store.title}" was deleted`,
      },
    });

    return deletedStore;
  }

  /**
   * Get store by ID
   */
  async getStoreById(storeId: number) {
    const store = await prisma.store.findUnique({
      where: { id: storeId },
      include: {
        user: {
          select: {
            id: true,
            telegramId: true,
            telegramUsername: true,
            firstName: true,
            lastName: true,
          },
        },
        storeCategories: {
          include: {
            category: true,
          },
        },
        products: {
          where: { isPublished: true },
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!store) {
      throw new NotFoundError('Store not found');
    }

    // Increment view count
    await prisma.store.update({
      where: { id: storeId },
      data: {
        stats: {
          ...(store.stats as any),
          views: ((store.stats as any)?.views || 0) + 1,
        },
      },
    });

    return store;
  }

  /**
   * Get store by slug
   */
  async getStoreBySlug(slug: string) {
    const store = await prisma.store.findUnique({
      where: { slug },
      include: {
        user: {
          select: {
            id: true,
            telegramId: true,
            telegramUsername: true,
            firstName: true,
            lastName: true,
          },
        },
        storeCategories: {
          include: {
            category: true,
          },
        },
        products: {
          where: { isPublished: true },
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!store) {
      throw new NotFoundError('Store not found');
    }

    return store;
  }

  /**
   * List stores with pagination and filters
   */
  async listStores(params: {
    page?: number;
    limit?: number;
    categoryId?: number;
    isApproved?: boolean;
    search?: string;
    userId?: string; // Telegram ID or user ID
  }) {
    const { skip, take, page, limit } = getPaginationParams(params.page, params.limit);

    const where: any = {
      isActive: true,
    };

    if (params.isApproved !== undefined) {
      where.isApproved = params.isApproved;
    }

    if (params.categoryId) {
      where.storeCategories = {
        some: {
          categoryId: params.categoryId,
        },
      };
    }

    if (params.userId) {
      // Search by telegramId (Telegram user IDs can be larger than INT4)
      where.user = {
        telegramId: params.userId,
        isActive: true,
      };
    }

    if (params.search) {
      where.OR = [
        { title: { contains: params.search, mode: 'insensitive' } },
        { description: { contains: params.search, mode: 'insensitive' } },
        { tags: { has: params.search } },
      ];
    }

    const [stores, total] = await Promise.all([
      prisma.store.findMany({
        where,
        skip,
        take,
        include: {
          user: {
            select: {
              id: true,
              telegramId: true,
              telegramUsername: true,
            },
          },
          storeCategories: {
            include: {
              category: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.store.count({ where }),
    ]);

    const meta = getPaginationMeta(total, page, limit);

    return { stores, meta };
  }

  /**
   * Get pending stores (for admin review)
   */
  async getPendingStores(page?: number, limit?: number) {
    return this.listStores({ page, limit, isApproved: false });
  }
}

export default new StoreService();
