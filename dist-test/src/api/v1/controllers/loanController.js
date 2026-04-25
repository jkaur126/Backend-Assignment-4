"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeLoan = exports.patchLoan = exports.postLoan = exports.getLoan = exports.getLoans = void 0;
const httpStatus_1 = require("../../../constants/httpStatus");
const errorCodes_1 = require("../../../constants/errorCodes");
const AppError_1 = require("../errors/AppError");
const loanStore_1 = require("../utils/loanStore");
const validStatuses = new Set(["pending", "under_review", "approved", "rejected", "flagged"]);
const validateCreatePayload = (body) => {
    if (typeof body.applicant !== "string" || body.applicant.trim().length === 0) {
        throw new AppError_1.BadRequestError("Applicant is required.", errorCodes_1.ERROR_CODES.VALIDATION_ERROR);
    }
    if (typeof body.amount !== "number" || body.amount <= 0) {
        throw new AppError_1.BadRequestError("Amount must be a positive number.", errorCodes_1.ERROR_CODES.VALIDATION_ERROR);
    }
    if (typeof body.riskScore !== "number" || body.riskScore < 0 || body.riskScore > 100) {
        throw new AppError_1.BadRequestError("Risk score must be between 0 and 100.", errorCodes_1.ERROR_CODES.VALIDATION_ERROR);
    }
    if (body.status !== undefined && (typeof body.status !== "string" || !validStatuses.has(body.status))) {
        throw new AppError_1.BadRequestError("Status is invalid.", errorCodes_1.ERROR_CODES.VALIDATION_ERROR);
    }
    if (body.notes !== undefined && typeof body.notes !== "string") {
        throw new AppError_1.BadRequestError("Notes must be a string.", errorCodes_1.ERROR_CODES.VALIDATION_ERROR);
    }
    return body;
};
const validateUpdatePayload = (body) => {
    if (Object.keys(body).length === 0) {
        throw new AppError_1.BadRequestError("At least one field is required for update.", errorCodes_1.ERROR_CODES.VALIDATION_ERROR);
    }
    if (body.applicant !== undefined && (typeof body.applicant !== "string" || body.applicant.trim().length === 0)) {
        throw new AppError_1.BadRequestError("Applicant must be a non-empty string.", errorCodes_1.ERROR_CODES.VALIDATION_ERROR);
    }
    if (body.amount !== undefined && (typeof body.amount !== "number" || body.amount <= 0)) {
        throw new AppError_1.BadRequestError("Amount must be a positive number.", errorCodes_1.ERROR_CODES.VALIDATION_ERROR);
    }
    if (body.riskScore !== undefined &&
        (typeof body.riskScore !== "number" || body.riskScore < 0 || body.riskScore > 100)) {
        throw new AppError_1.BadRequestError("Risk score must be between 0 and 100.", errorCodes_1.ERROR_CODES.VALIDATION_ERROR);
    }
    if (body.status !== undefined && (typeof body.status !== "string" || !validStatuses.has(body.status))) {
        throw new AppError_1.BadRequestError("Status is invalid.", errorCodes_1.ERROR_CODES.VALIDATION_ERROR);
    }
    if (body.notes !== undefined && typeof body.notes !== "string") {
        throw new AppError_1.BadRequestError("Notes must be a string.", errorCodes_1.ERROR_CODES.VALIDATION_ERROR);
    }
    return body;
};
const getLoans = (_req, res) => {
    res.status(httpStatus_1.HTTP_STATUS.OK).json({
        success: true,
        data: (0, loanStore_1.listLoans)(),
    });
};
exports.getLoans = getLoans;
const getLoan = (req, res) => {
    res.status(httpStatus_1.HTTP_STATUS.OK).json({
        success: true,
        data: (0, loanStore_1.getLoanById)(req.params.id),
    });
};
exports.getLoan = getLoan;
const postLoan = (req, res) => {
    const loan = (0, loanStore_1.createLoan)(validateCreatePayload(req.body));
    res.status(httpStatus_1.HTTP_STATUS.CREATED).json({
        success: true,
        data: loan,
    });
};
exports.postLoan = postLoan;
const patchLoan = (req, res) => {
    const loan = (0, loanStore_1.updateLoan)(req.params.id, validateUpdatePayload(req.body));
    res.status(httpStatus_1.HTTP_STATUS.OK).json({
        success: true,
        data: loan,
    });
};
exports.patchLoan = patchLoan;
const removeLoan = (req, res) => {
    const loan = (0, loanStore_1.deleteLoan)(req.params.id);
    res.status(httpStatus_1.HTTP_STATUS.OK).json({
        success: true,
        data: loan,
    });
};
exports.removeLoan = removeLoan;
