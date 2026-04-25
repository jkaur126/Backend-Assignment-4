"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheck = void 0;
const httpStatus_1 = require("../../../constants/httpStatus");
const healthCheck = (_req, res) => {
    res.status(httpStatus_1.HTTP_STATUS.OK).json({
        success: true,
        data: {
            status: "ok",
            service: "high-risk-loan-monitoring-system",
            timestamp: new Date().toISOString(),
        },
    });
};
exports.healthCheck = healthCheck;
