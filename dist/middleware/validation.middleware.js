"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQuery = exports.validateBody = exports.validate = void 0;
const zod_1 = require("zod");
const response_util_1 = require("../utils/response.util");
/**
 * Zod validation middleware factory
 */
const validate = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errors = error.errors.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message,
                }));
                (0, response_util_1.sendValidationError)(res, errors);
                return;
            }
            next(error);
        }
    };
};
exports.validate = validate;
/**
 * Validate request body only
 */
const validateBody = (schema) => {
    return async (req, res, next) => {
        try {
            req.body = await schema.parseAsync(req.body);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errors = error.errors.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message,
                }));
                (0, response_util_1.sendValidationError)(res, errors);
                return;
            }
            next(error);
        }
    };
};
exports.validateBody = validateBody;
/**
 * Validate query parameters
 */
const validateQuery = (schema) => {
    return async (req, res, next) => {
        try {
            req.query = await schema.parseAsync(req.query);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errors = error.errors.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message,
                }));
                (0, response_util_1.sendValidationError)(res, errors);
                return;
            }
            next(error);
        }
    };
};
exports.validateQuery = validateQuery;
//# sourceMappingURL=validation.middleware.js.map