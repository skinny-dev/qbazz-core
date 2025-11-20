import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors.util';
import { sendError, sendServerError } from '../utils/response.util';

/**
 * Global error handler middleware
 */
export const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  // Log error
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  // Handle known errors
  if (err instanceof AppError) {
    return sendError(res, err.message, err.statusCode);
  }

  // Handle Prisma errors
  if (err.name === 'PrismaClientKnownRequestError') {
    const prismaError = err as any;
    if (prismaError.code === 'P2002') {
      return sendError(res, 'Resource already exists', 409);
    }
    if (prismaError.code === 'P2025') {
      return sendError(res, 'Resource not found', 404);
    }
  }

  // Default error
  return sendServerError(res, 'Something went wrong');
};

/**
 * 404 Not Found handler
 */
export const notFoundHandler = (req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    error: `Route ${req.method} ${req.path} not found`,
  });
};

/**
 * Async handler wrapper
 * Catches async errors and passes to error handler
 */
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
