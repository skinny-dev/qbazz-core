/**
 * Generate URL-friendly slug
 */
export declare function generateSlug(text: string, suffix?: string): string;
/**
 * Generate unique slug with timestamp
 */
export declare function generateUniqueSlug(text: string): string;
/**
 * Paginate helper
 */
export declare function getPaginationParams(page?: number, limit?: number): {
    skip: number;
    take: number;
    page: number;
    limit: number;
};
/**
 * Calculate pagination metadata
 */
export declare function getPaginationMeta(total: number, page: number, limit: number): {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
};
/**
 * Sanitize search query
 */
export declare function sanitizeSearchQuery(query: string): string;
/**
 * Parse JSON safely
 */
export declare function parseJSON<T>(jsonString: string, defaultValue: T): T;
/**
 * Delay/sleep utility
 */
export declare function delay(ms: number): Promise<void>;
/**
 * Format currency (Toman/IRR)
 */
export declare function formatCurrency(amount: number, currency?: string): string;
/**
 * Extract Telegram channel ID from username
 */
export declare function extractTelegramChannelId(input: string): string;
/**
 * Check if user is admin/moderator
 */
export declare function isAdmin(role: string): boolean;
//# sourceMappingURL=helpers.util.d.ts.map