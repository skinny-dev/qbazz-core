import { Request, Response, NextFunction } from 'express';
/**
 * Global error handler middleware
 */
export declare const errorHandler: (err: Error, req: Request, res: Response, _next: NextFunction) => Response<any, Record<string, any>>;
/**
 * 404 Not Found handler
 */
export declare const notFoundHandler: (req: Request, res: Response) => Response<any, Record<string, any>>;
/**
 * Async handler wrapper
 * Catches async errors and passes to error handler
 */
export declare const asyncHandler: (fn: Function) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=error.middleware.d.ts.map