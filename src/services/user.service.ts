import prisma from '../config/database';
import { NotFoundError } from '../utils/errors.util';
import { CreateUserInput } from '../validators';

export class UserService {
  /**
   * Create or update user (upsert)
   */
  async upsertUser(data: CreateUserInput) {
    const user = await prisma.user.upsert({
      where: { telegramId: data.telegramId },
      update: {
        telegramAvatar: data.telegramAvatar,
        telegramUsername: data.telegramUsername,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
      },
      create: data,
    });

    return user;
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        stores: {
          include: {
            categories: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  /**
   * Get user by Telegram ID
   */
  async getUserByTelegramId(telegramId: string) {
    const user = await prisma.user.findUnique({
      where: { telegramId },
      include: {
        stores: {
          include: {
            categories: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  /**
   * Ban user
   */
  async banUser(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const bannedUser = await prisma.user.update({
      where: { id: userId },
      data: { isBanned: true, isActive: false },
    });

    // Deactivate all user's stores
    await prisma.store.updateMany({
      where: { userId },
      data: { isActive: false },
    });

    return bannedUser;
  }

  /**
   * Unban user
   */
  async unbanUser(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const unbannedUser = await prisma.user.update({
      where: { id: userId },
      data: { isBanned: false, isActive: true },
    });

    return unbannedUser;
  }
}

export default new UserService();
