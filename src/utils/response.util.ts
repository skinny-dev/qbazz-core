import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: any[];
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

/**
 * Send success response
 */
export function sendSuccess<T>(
  res: Response,
  data: T,
  message: string = 'Success',
  statusCode: number = 200,
  meta?: ApiResponse['meta']
): Response {
  const response: ApiResponse<T> = {
    success: true,
    data,
    message,
    ...(meta && { meta }),
  };
  return res.status(statusCode).json(response);
}

/**
 * Send error response
 */
export function sendError(
  res: Response,
  error: string,
  statusCode: number = 400,
  errors?: any[]
): Response {
  const response: ApiResponse = {
    success: false,
    error,
    ...(errors && { errors }),
  };
  return res.status(statusCode).json(response);
}

/**
 * Send created response (201)
 */
export function sendCreated<T>(res: Response, data: T, message: string = 'Created'): Response {
  return sendSuccess(res, data, message, 201);
}

/**
 * Send not found response (404)
 */
export function sendNotFound(res: Response, message: string = 'Resource not found'): Response {
  return sendError(res, message, 404);
}

/**
 * Send unauthorized response (401)
 */
export function sendUnauthorized(res: Response, message: string = 'Unauthorized'): Response {
  return sendError(res, message, 401);
}

/**
 * Send forbidden response (403)
 */
export function sendForbidden(
  res: Response,
  message: string = 'Forbidden - Access denied'
): Response {
  return sendError(res, message, 403);
}

/**
 * Send validation error response (422)
 */
export function sendValidationError(
  res: Response,
  errors: any[],
  message: string = 'Validation failed'
): Response {
  return sendError(res, message, 422, errors);
}

/**
 * Send internal server error response (500)
 */
export function sendServerError(
  res: Response,
  message: string = 'Internal server error'
): Response {
  return sendError(res, message, 500);
}
