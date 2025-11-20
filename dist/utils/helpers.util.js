"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSlug = generateSlug;
exports.generateUniqueSlug = generateUniqueSlug;
exports.getPaginationParams = getPaginationParams;
exports.getPaginationMeta = getPaginationMeta;
exports.sanitizeSearchQuery = sanitizeSearchQuery;
exports.parseJSON = parseJSON;
exports.delay = delay;
exports.formatCurrency = formatCurrency;
exports.extractTelegramChannelId = extractTelegramChannelId;
exports.isAdmin = isAdmin;
const slugify_1 = __importDefault(require("slugify"));
/**
 * Generate URL-friendly slug
 */
function generateSlug(text, suffix) {
    const baseSlug = (0, slugify_1.default)(text, {
        lower: true,
        strict: true,
        trim: true,
    });
    return suffix ? `${baseSlug}-${suffix}` : baseSlug;
}
/**
 * Generate unique slug with timestamp
 */
function generateUniqueSlug(text) {
    const timestamp = Date.now().toString(36);
    return generateSlug(text, timestamp);
}
/**
 * Paginate helper
 */
function getPaginationParams(page, limit) {
    const currentPage = Math.max(1, page || 1);
    const pageSize = Math.min(100, Math.max(1, limit || 10));
    const skip = (currentPage - 1) * pageSize;
    return {
        skip,
        take: pageSize,
        page: currentPage,
        limit: pageSize,
    };
}
/**
 * Calculate pagination metadata
 */
function getPaginationMeta(total, page, limit) {
    const totalPages = Math.ceil(total / limit);
    return {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
    };
}
/**
 * Sanitize search query
 */
function sanitizeSearchQuery(query) {
    return query.trim().replace(/[^\w\s\u0600-\u06FF-]/g, '');
}
/**
 * Parse JSON safely
 */
function parseJSON(jsonString, defaultValue) {
    try {
        return JSON.parse(jsonString);
    }
    catch {
        return defaultValue;
    }
}
/**
 * Delay/sleep utility
 */
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
/**
 * Format currency (Toman/IRR)
 */
function formatCurrency(amount, currency = 'تومان') {
    return `${amount.toLocaleString('fa-IR')} ${currency}`;
}
/**
 * Extract Telegram channel ID from username
 */
function extractTelegramChannelId(input) {
    // Remove @ if present
    return input.replace('@', '').trim();
}
/**
 * Check if user is admin/moderator
 */
function isAdmin(role) {
    return ['SUPER_ADMIN', 'ADMIN', 'MODERATOR'].includes(role);
}
//# sourceMappingURL=helpers.util.js.map