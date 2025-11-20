import { Request, Response, NextFunction } from 'express';
/**
 * Rate limiting middleware
 */
export declare const rateLimiter: import("express-rate-limit").RateLimitRequestHandler;
/**
 * Strict rate limiter for sensitive operations
 */
export declare const strictRateLimiter: import("express-rate-limit").RateLimitRequestHandler;
/**
 * Anti-scraping middleware
 * Blocks automated scrapers and bots
 */
export declare const antiScraping: (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
/**
 * Admin authentication middleware
 * Check if request is from admin based on Telegram ID
 */
export declare const isAdmin: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
/**
 * User authentication middleware
 * Check if request is from authenticated user
 */
export declare const isAuthenticated: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
/**
 * Optional authentication - doesn't block if not authenticated
 */
export declare const optionalAuth: (req: Request, _res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.middleware.d.ts.map