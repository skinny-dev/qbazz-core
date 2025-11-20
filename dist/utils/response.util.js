"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSuccess = sendSuccess;
exports.sendError = sendError;
exports.sendCreated = sendCreated;
exports.sendNotFound = sendNotFound;
exports.sendUnauthorized = sendUnauthorized;
exports.sendForbidden = sendForbidden;
exports.sendValidationError = sendValidationError;
exports.sendServerError = sendServerError;
/**
 * Send success response
 */
function sendSuccess(res, data, message = 'Success', statusCode = 200, meta) {
    const response = {
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
function sendError(res, error, statusCode = 400, errors) {
    const response = {
        success: false,
        error,
        ...(errors && { errors }),
    };
    return res.status(statusCode).json(response);
}
/**
 * Send created response (201)
 */
function sendCreated(res, data, message = 'Created') {
    return sendSuccess(res, data, message, 201);
}
/**
 * Send not found response (404)
 */
function sendNotFound(res, message = 'Resource not found') {
    return sendError(res, message, 404);
}
/**
 * Send unauthorized response (401)
 */
function sendUnauthorized(res, message = 'Unauthorized') {
    return sendError(res, message, 401);
}
/**
 * Send forbidden response (403)
 */
function sendForbidden(res, message = 'Forbidden - Access denied') {
    return sendError(res, message, 403);
}
/**
 * Send validation error response (422)
 */
function sendValidationError(res, errors, message = 'Validation failed') {
    return sendError(res, message, 422, errors);
}
/**
 * Send internal server error response (500)
 */
function sendServerError(res, message = 'Internal server error') {
    return sendError(res, message, 500);
}
//# sourceMappingURL=response.util.js.map