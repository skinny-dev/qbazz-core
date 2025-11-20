import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';
/**
 * Zod validation middleware factory
 */
export declare const validate: (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Validate request body only
 */
export declare const validateBody: (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Validate query parameters
 */
export declare const validateQuery: (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=validation.middleware.d.ts.map