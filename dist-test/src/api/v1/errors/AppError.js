"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.NotFoundError = exports.AuthorizationError = exports.AuthenticationError = exports.BadRequestError = exports.AppError = void 0;
const httpStatus_1 = require("../../../constants/httpStatus");
class AppError extends Error {
    constructor(message, options) {
        super(message);
        this.name = this.constructor.name;
        this.code = options.code;
        this.statusCode = options.statusCode;
        this.details = options.details;
    }
}
exports.AppError = AppError;
class BadRequestError extends AppError {
    constructor(message, code, details) {
        super(message, { code, statusCode: httpStatus_1.HTTP_STATUS.BAD_REQUEST, details });
    }
}
exports.BadRequestError = BadRequestError;
class AuthenticationError extends AppError {
    constructor(message, code, details) {
        super(message, { code, statusCode: httpStatus_1.HTTP_STATUS.UNAUTHORIZED, details });
    }
}
exports.AuthenticationError = AuthenticationError;
class AuthorizationError extends AppError {
    constructor(message, code, details) {
        super(message, { code, statusCode: httpStatus_1.HTTP_STATUS.FORBIDDEN, details });
    }
}
exports.AuthorizationError = AuthorizationError;
class NotFoundError extends AppError {
    constructor(message, code, details) {
        super(message, { code, statusCode: httpStatus_1.HTTP_STATUS.NOT_FOUND, details });
    }
}
exports.NotFoundError = NotFoundError;
class InternalServerError extends AppError {
    constructor(message, code, details) {
        super(message, { code, statusCode: httpStatus_1.HTTP_STATUS.INTERNAL_SERVER_ERROR, details });
    }
}
exports.InternalServerError = InternalServerError;
