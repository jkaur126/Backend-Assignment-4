"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toErrorResponse = void 0;
const errorCodes_1 = require("../../../constants/errorCodes");
const httpStatus_1 = require("../../../constants/httpStatus");
const AppError_1 = require("../errors/AppError");
const toErrorResponse = (error) => {
    if (error instanceof AppError_1.AppError) {
        return {
            statusCode: error.statusCode,
            body: {
                success: false,
                error: {
                    code: error.code,
                    message: error.message,
                    ...(error.details !== undefined ? { details: error.details } : {}),
                },
                timestamp: new Date().toISOString(),
            },
        };
    }
    return {
        statusCode: httpStatus_1.HTTP_STATUS.INTERNAL_SERVER_ERROR,
        body: {
            success: false,
            error: {
                code: errorCodes_1.ERROR_CODES.INTERNAL_SERVER_ERROR,
                message: "An unexpected error occurred.",
            },
            timestamp: new Date().toISOString(),
        },
    };
};
exports.toErrorResponse = toErrorResponse;
