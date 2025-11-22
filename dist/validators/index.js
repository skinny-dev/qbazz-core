"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdminSchema = exports.createUserSchema = exports.updateCategorySchema = exports.createCategorySchema = exports.updateProductSchema = exports.createProductSchema = exports.updateStoreSchema = exports.createStoreSchema = void 0;
exports.validateIranianNationalCode = validateIranianNationalCode;
exports.validateTelegramId = validateTelegramId;
exports.validatePhoneNumber = validatePhoneNumber;
exports.validateSlug = validateSlug;
const zod_1 = require("zod");
/**
 * Validate Iranian National Code (کد ملی)
 * 10-digit code with specific checksum algorithm
 */
function validateIranianNationalCode(nationalCode) {
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
function validateTelegramId(telegramId) {
    // Telegram IDs can be numeric (user/bot) or channel IDs (starting with -)
    return /^-?\d+$/.test(telegramId);
}
/**
 * Validate phone number (international format)
 */
function validatePhoneNumber(phone) {
    // Support international format: +[country code][number]
    return /^\+?[1-9]\d{7,14}$/.test(phone.replace(/[\s-]/g, ''));
}
/**
 * Validate slug format
 */
function validateSlug(slug) {
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}
// ==================== ZOD SCHEMAS ====================
// Store Creation Schema
exports.createStoreSchema = zod_1.z.object({
    title: zod_1.z.string().min(3).max(255),
    description: zod_1.z.string().max(1000).optional().nullable(),
    longDescription: zod_1.z.string().max(5000).optional().nullable(),
    socials: zod_1.z.object({
        telegram: zod_1.z.object({
            id: zod_1.z.string().refine(validateTelegramId, 'Invalid Telegram ID'),
            avatar: zod_1.z.string().url().optional(),
            bio: zod_1.z.string().max(500).optional(),
            username: zod_1.z.string().optional(),
        }),
        instagram: zod_1.z.string().optional(),
        whatsapp: zod_1.z.string().optional(),
        website: zod_1.z.string().url().optional(),
    }),
    identity: zod_1.z.object({
        nationalCode: zod_1.z.string().refine(validateIranianNationalCode, 'Invalid Iranian national code'),
        location: zod_1.z.object({
            city: zod_1.z.string(),
            country: zod_1.z.string().default('Iran'),
            coordinates: zod_1.z
                .object({
                lat: zod_1.z.number(),
                lng: zod_1.z.number(),
            })
                .optional(),
        }),
        address: zod_1.z.string().optional(),
        phones: zod_1.z.array(zod_1.z.string()).optional(),
    }),
    avatar: zod_1.z.string().url().optional(),
    coverImage: zod_1.z.string().url().optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    categoryIds: zod_1.z.array(zod_1.z.number()).min(1, 'At least one category is required'),
});
// Store Update Schema
exports.updateStoreSchema = exports.createStoreSchema.partial();
// Product Creation Schema
exports.createProductSchema = zod_1.z.object({
    storeId: zod_1.z.number(),
    categoryId: zod_1.z.number().optional(),
    title: zod_1.z.string().min(3).max(500),
    description: zod_1.z.string().optional(),
    longDescription: zod_1.z.string().optional(),
    properties: zod_1.z.record(zod_1.z.any()),
    pricing: zod_1.z.record(zod_1.z.any()),
    colors: zod_1.z.array(zod_1.z.string()).optional(),
    colorVariations: zod_1.z.array(zod_1.z.any()).optional(),
    availability: zod_1.z.enum(['available', 'out_of_stock', 'pre_order']).default('available'),
    stockQuantity: zod_1.z.number().int().min(0).optional(),
    brand: zod_1.z.string().optional(),
    manufacturer: zod_1.z.string().optional(),
    condition: zod_1.z.string().optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    images: zod_1.z.array(zod_1.z.string().url()),
    sourceMetadata: zod_1.z.record(zod_1.z.any()).optional(),
});
// Product Update Schema
exports.updateProductSchema = exports.createProductSchema.partial();
// Category Schema
exports.createCategorySchema = zod_1.z.object({
    title: zod_1.z.string().min(2).max(255),
    slug: zod_1.z.string().refine(validateSlug, 'Invalid slug format'),
    icon: zod_1.z.string().url().optional(),
    description: zod_1.z.string().optional(),
    parentId: zod_1.z.number().optional(),
    metaTitle: zod_1.z.string().max(255).optional(),
    metaDescription: zod_1.z.string().max(500).optional(),
    metaKeywords: zod_1.z.array(zod_1.z.string()).optional(),
});
exports.updateCategorySchema = exports.createCategorySchema.partial();
// User Schema
exports.createUserSchema = zod_1.z.object({
    telegramId: zod_1.z.string().refine(validateTelegramId, 'Invalid Telegram ID'),
    telegramAvatar: zod_1.z.string().url().optional(),
    telegramUsername: zod_1.z.string().optional(),
    firstName: zod_1.z.string().max(100).optional(),
    lastName: zod_1.z.string().max(100).optional(),
    phoneNumber: zod_1.z.string().refine(validatePhoneNumber, 'Invalid phone number').optional(),
});
// Admin Schema
exports.createAdminSchema = zod_1.z.object({
    phoneNumber: zod_1.z.string().refine(validatePhoneNumber, 'Invalid phone number'),
    telegramId: zod_1.z.string().refine(validateTelegramId, 'Invalid Telegram ID'),
    telegramAvatar: zod_1.z.string().url().optional(),
    telegramName: zod_1.z.string().min(2).max(255),
    role: zod_1.z.enum(['SUPER_ADMIN', 'ADMIN', 'MODERATOR']).default('MODERATOR'),
});
//# sourceMappingURL=index.js.map