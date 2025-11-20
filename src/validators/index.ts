import { z } from 'zod';

/**
 * Validate Iranian National Code (کد ملی)
 * 10-digit code with specific checksum algorithm
 */
export function validateIranianNationalCode(nationalCode: string): boolean {
  if (!nationalCode || nationalCode.length !== 10) {
    return false;
  }

  // Check if all characters are digits
  if (!/^\d{10}$/.test(nationalCode)) {
    return false;
  }

  // Check for invalid patterns (all same digits)
  if (/^(\d)\1{9}$/.test(nationalCode)) {
    return false;
  }

  // Calculate checksum
  const check = parseInt(nationalCode[9]);
  let sum = 0;

  for (let i = 0; i < 9; i++) {
    sum += parseInt(nationalCode[i]) * (10 - i);
  }

  const remainder = sum % 11;
  const validCheck = remainder < 2 ? remainder : 11 - remainder;

  return check === validCheck;
}

/**
 * Validate Telegram ID format
 */
export function validateTelegramId(telegramId: string): boolean {
  // Telegram IDs can be numeric (user/bot) or channel IDs (starting with -)
  return /^-?\d+$/.test(telegramId);
}

/**
 * Validate phone number (international format)
 */
export function validatePhoneNumber(phone: string): boolean {
  // Support international format: +[country code][number]
  return /^\+?[1-9]\d{7,14}$/.test(phone.replace(/[\s-]/g, ''));
}

/**
 * Validate slug format
 */
export function validateSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

// ==================== ZOD SCHEMAS ====================

// Store Creation Schema
export const createStoreSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(10).max(1000).optional(),
  longDescription: z.string().max(5000).optional(),
  socials: z.object({
    telegram: z.object({
      id: z.string().refine(validateTelegramId, 'Invalid Telegram ID'),
      avatar: z.string().url().optional(),
      bio: z.string().max(500).optional(),
      username: z.string().optional(),
    }),
    instagram: z.string().optional(),
    whatsapp: z.string().optional(),
    website: z.string().url().optional(),
  }),
  identity: z.object({
    nationalCode: z.string().refine(validateIranianNationalCode, 'Invalid Iranian national code'),
    location: z.object({
      city: z.string(),
      country: z.string().default('Iran'),
      coordinates: z
        .object({
          lat: z.number(),
          lng: z.number(),
        })
        .optional(),
    }),
    address: z.string().optional(),
    phones: z.array(z.string()).optional(),
  }),
  avatar: z.string().url().optional(),
  coverImage: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
  categoryIds: z.array(z.number()).min(1, 'At least one category is required'),
});

// Store Update Schema
export const updateStoreSchema = createStoreSchema.partial();

// Product Creation Schema
export const createProductSchema = z.object({
  storeId: z.number(),
  categoryId: z.number().optional(),
  title: z.string().min(3).max(500),
  description: z.string().optional(),
  longDescription: z.string().optional(),
  properties: z.record(z.any()),
  pricing: z.record(z.any()),
  colors: z.array(z.string()).optional(),
  colorVariations: z.array(z.any()).optional(),
  availability: z.enum(['available', 'out_of_stock', 'pre_order']).default('available'),
  stockQuantity: z.number().int().min(0).optional(),
  brand: z.string().optional(),
  manufacturer: z.string().optional(),
  condition: z.string().optional(),
  tags: z.array(z.string()).optional(),
  images: z.array(z.string().url()),
  sourceMetadata: z.record(z.any()).optional(),
});

// Product Update Schema
export const updateProductSchema = createProductSchema.partial();

// Category Schema
export const createCategorySchema = z.object({
  title: z.string().min(2).max(255),
  slug: z.string().refine(validateSlug, 'Invalid slug format'),
  icon: z.string().url().optional(),
  description: z.string().optional(),
  parentId: z.number().optional(),
  metaTitle: z.string().max(255).optional(),
  metaDescription: z.string().max(500).optional(),
  metaKeywords: z.array(z.string()).optional(),
});

export const updateCategorySchema = createCategorySchema.partial();

// User Schema
export const createUserSchema = z.object({
  telegramId: z.string().refine(validateTelegramId, 'Invalid Telegram ID'),
  telegramAvatar: z.string().url().optional(),
  telegramUsername: z.string().optional(),
  firstName: z.string().max(100).optional(),
  lastName: z.string().max(100).optional(),
  phoneNumber: z.string().refine(validatePhoneNumber, 'Invalid phone number').optional(),
});

// Admin Schema
export const createAdminSchema = z.object({
  phoneNumber: z.string().refine(validatePhoneNumber, 'Invalid phone number'),
  telegramId: z.string().refine(validateTelegramId, 'Invalid Telegram ID'),
  telegramAvatar: z.string().url().optional(),
  telegramName: z.string().min(2).max(255),
  role: z.enum(['SUPER_ADMIN', 'ADMIN', 'MODERATOR']).default('MODERATOR'),
});

export type CreateStoreInput = z.infer<typeof createStoreSchema>;
export type UpdateStoreInput = z.infer<typeof updateStoreSchema>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type CreateAdminInput = z.infer<typeof createAdminSchema>;
