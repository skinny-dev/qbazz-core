"use strict";
/**
 * Custom Application Errors
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = exports.ConflictError = exports.ForbiddenError = exports.UnauthorizedError = exports.NotFoundError = exports.ValidationError = exports.AppError = void 0;
class AppError extends Error {
    constructor(statusCode, message, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.isOperational = isOperational;
        Object.setPrototypeOf(this, AppError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
class ValidationError extends AppError {
    constructor(message, errors) {
        super(422, message);
        this.errors = errors;
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}
exports.ValidationError = ValidationError;
class NotFoundError extends AppError {
    constructor(message = 'Resource not found') {
        super(404, message);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
exports.NotFoundError = NotFoundError;
class UnauthorizedError extends AppError {
    constructor(message = 'Unauthorized access') {
        super(401, message);
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends AppError {
    constructor(message = 'Forbidden - Access denied') {
        super(403, message);
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
}
exports.ForbiddenError = ForbiddenError;
class ConflictError extends AppError {
    constructor(message = 'Resource already exists') {
        super(409, message);
        Object.setPrototypeOf(this, ConflictError.prototype);
    }
}
exports.ConflictError = ConflictError;
class BadRequestError extends AppError {
    constructor(message = 'Bad request') {
        super(400, message);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}
exports.BadRequestError = BadRequestError;
//# sourceMappingURL=errors.util.js.map