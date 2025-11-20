"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuth = exports.isAuthenticated = exports.isAdmin = exports.antiScraping = exports.strictRateLimiter = exports.rateLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
/**
 * Rate limiting middleware
 */
exports.rateLimiter = (0, express_rate_limit_1.default)({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});
/**
 * Strict rate limiter for sensitive operations
 */
exports.strictRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60000, // 1 minute
    max: 5,
    message: 'Too many requests, please slow down.',
});
/**
 * Anti-scraping middleware
 * Blocks automated scrapers and bots
 */
const antiScraping = (req, res, next) => {
    const userAgent = req.get('User-Agent') || '';
    // Block common scraping bots
    const blockedBots = [
        'scrapy',
        'selenium',
        'phantomjs',
        'curl',
        'wget',
        'python-requests',
        'axios',
        'httpx',
    ];
    const isBot = blockedBots.some((bot) => userAgent.toLowerCase().includes(bot));
    if (isBot) {
        return res.status(403).json({
            success: false,
            error: 'Access denied',
        });
    }
    // Check for missing or suspicious headers
    const hasAccept = req.get('Accept');
    const hasAcceptLanguage = req.get('Accept-Language');
    if (!hasAccept || !hasAcceptLanguage) {
        // Log suspicious request
        console.warn('Suspicious request detected:', {
            ip: req.ip,
            userAgent,
            path: req.path,
        });
    }
    return next();
};
exports.antiScraping = antiScraping;
/**
 * Admin authentication middleware
 * Check if request is from admin based on Telegram ID
 */
const isAdmin = async (req, res, next) => {
    try {
        const telegramId = req.get('X-Telegram-Id');
        if (!telegramId) {
            return res.status(401).json({
                success: false,
                error: 'Unauthorized - Admin credentials required',
            });
        }
        // Check if admin exists
        const prisma = require('../config/database').default;
        const admin = await prisma.admin.findUnique({
            where: { telegramId },
        });
        if (!admin || !admin.isActive) {
            return res.status(403).json({
                success: false,
                error: 'Forbidden - Admin access required',
            });
        }
        // Attach admin to request
        req.admin = admin;
        return next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Internal server error',
        });
    }
};
exports.isAdmin = isAdmin;
/**
 * User authentication middleware
 * Check if request is from authenticated user
 */
const isAuthenticated = async (req, res, next) => {
    try {
        const telegramId = req.get('X-Telegram-Id');
        if (!telegramId) {
            return res.status(401).json({
                success: false,
                error: 'Unauthorized - Authentication required',
            });
        }
        // Check if user exists
        const prisma = require('../config/database').default;
        const user = await prisma.user.findUnique({
            where: { telegramId },
        });
        if (!user || !user.isActive || user.isBanned) {
            return res.status(403).json({
                success: false,
                error: 'Forbidden - User access denied',
            });
        }
        // Attach user to request
        req.user = user;
        return next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Internal server error',
        });
    }
};
exports.isAuthenticated = isAuthenticated;
/**
 * Optional authentication - doesn't block if not authenticated
 */
const optionalAuth = async (req, _res, next) => {
    try {
        const telegramId = req.get('X-Telegram-Id');
        if (telegramId) {
            const prisma = require('../config/database').default;
            const user = await prisma.user.findUnique({
                where: { telegramId },
            });
            if (user && user.isActive && !user.isBanned) {
                req.user = user;
            }
        }
        next();
    }
    catch (error) {
        next();
    }
};
exports.optionalAuth = optionalAuth;
//# sourceMappingURL=auth.middleware.js.map