"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = exports.notFoundHandler = exports.errorHandler = void 0;
const errors_util_1 = require("../utils/errors.util");
const response_util_1 = require("../utils/response.util");
/**
 * Global error handler middleware
 */
const errorHandler = (err, req, res, _next) => {
    // Log error
    console.error('Error:', {
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
    });
    // Handle known errors
    if (err instanceof errors_util_1.AppError) {
        return (0, response_util_1.sendError)(res, err.message, err.statusCode);
    }
    // Handle Prisma errors
    if (err.name === 'PrismaClientKnownRequestError') {
        const prismaError = err;
        if (prismaError.code === 'P2002') {
            return (0, response_util_1.sendError)(res, 'Resource already exists', 409);
        }
        if (prismaError.code === 'P2025') {
            return (0, response_util_1.sendError)(res, 'Resource not found', 404);
        }
    }
    // Default error
    return (0, response_util_1.sendServerError)(res, 'Something went wrong');
};
exports.errorHandler = errorHandler;
/**
 * 404 Not Found handler
 */
const notFoundHandler = (req, res) => {
    return res.status(404).json({
        success: false,
        error: `Route ${req.method} ${req.path} not found`,
    });
};
exports.notFoundHandler = notFoundHandler;
/**
 * Async handler wrapper
 * Catches async errors and passes to error handler
 */
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.asyncHandler = asyncHandler;
//# sourceMappingURL=error.middleware.js.map