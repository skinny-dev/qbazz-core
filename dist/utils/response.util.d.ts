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
export declare function sendSuccess<T>(res: Response, data: T, message?: string, statusCode?: number, meta?: ApiResponse['meta']): Response;
/**
 * Send error response
 */
export declare function sendError(res: Response, error: string, statusCode?: number, errors?: any[]): Response;
/**
 * Send created response (201)
 */
export declare function sendCreated<T>(res: Response, data: T, message?: string): Response;
/**
 * Send not found response (404)
 */
export declare function sendNotFound(res: Response, message?: string): Response;
/**
 * Send unauthorized response (401)
 */
export declare function sendUnauthorized(res: Response, message?: string): Response;
/**
 * Send forbidden response (403)
 */
export declare function sendForbidden(res: Response, message?: string): Response;
/**
 * Send validation error response (422)
 */
export declare function sendValidationError(res: Response, errors: any[], message?: string): Response;
/**
 * Send internal server error response (500)
 */
export declare function sendServerError(res: Response, message?: string): Response;
//# sourceMappingURL=response.util.d.ts.map