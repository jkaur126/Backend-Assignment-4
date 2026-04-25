"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFoundHandler = void 0;
const errorResponse_1 = require("../utils/errorResponse");
const logger_1 = require("../../../config/logger");
const AppError_1 = require("../errors/AppError");
const errorCodes_1 = require("../../../constants/errorCodes");
const notFoundHandler = (req, _res, next) => {
    next(new AppError_1.NotFoundError(`Route not found: ${req.method} ${req.originalUrl}`, errorCodes_1.ERROR_CODES.RESOURCE_NOT_FOUND));
};
exports.notFoundHandler = notFoundHandler;
const errorHandler = (error, req, res, next) => {
    const { statusCode, body } = (0, errorResponse_1.toErrorResponse)(error);
    void next;
    (0, logger_1.writeErrorLog)(JSON.stringify({
        timestamp: body.timestamp,
        method: req.method,
        path: req.originalUrl,
        statusCode,
        error: body.error,
    }));
    res.status(statusCode).json(body);
};
exports.errorHandler = errorHandler;
