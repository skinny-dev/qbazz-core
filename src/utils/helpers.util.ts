import slugify from 'slugify';

/**
 * Generate URL-friendly slug
 */
export function generateSlug(text: string, suffix?: string): string {
  const baseSlug = slugify(text, {
    lower: true,
    strict: true,
    trim: true,
  });

  return suffix ? `${baseSlug}-${suffix}` : baseSlug;
}

/**
 * Generate unique slug with timestamp
 */
export function generateUniqueSlug(text: string): string {
  const timestamp = Date.now().toString(36);
  return generateSlug(text, timestamp);
}

/**
 * Paginate helper
 */
export function getPaginationParams(page?: number, limit?: number) {
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
export function getPaginationMeta(total: number, page: number, limit: number) {
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
export function sanitizeSearchQuery(query: string): string {
  return query.trim().replace(/[^\w\s\u0600-\u06FF-]/g, '');
}

/**
 * Parse JSON safely
 */
export function parseJSON<T>(jsonString: string, defaultValue: T): T {
  try {
    return JSON.parse(jsonString);
  } catch {
    return defaultValue;
  }
}

/**
 * Delay/sleep utility
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Format currency (Toman/IRR)
 */
export function formatCurrency(amount: number, currency: string = 'تومان'): string {
  return `${amount.toLocaleString('fa-IR')} ${currency}`;
}

/**
 * Extract Telegram channel ID from username
 */
export function extractTelegramChannelId(input: string): string {
  // Remove @ if present
  return input.replace('@', '').trim();
}

/**
 * Check if user is admin/moderator
 */
export function isAdmin(role: string): boolean {
  return ['SUPER_ADMIN', 'ADMIN', 'MODERATOR'].includes(role);
}
