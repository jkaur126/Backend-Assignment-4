import type { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpStatus";
import { ERROR_CODES } from "../../../constants/errorCodes";
import { BadRequestError } from "../errors/AppError";
import { createLoan, deleteLoan, getLoanById, listLoans, updateLoan } from "../utils/loanStore";
import type { CreateLoanApplicationInput, UpdateLoanApplicationInput } from "../models/loanApplication";

const validStatuses = new Set(["pending", "under_review", "approved", "rejected", "flagged"]);

const validateCreatePayload = (body: Record<string, unknown>): CreateLoanApplicationInput => {
  if (typeof body.applicant !== "string" || body.applicant.trim().length === 0) {
    throw new BadRequestError("Applicant is required.", ERROR_CODES.VALIDATION_ERROR);
  }

  if (typeof body.amount !== "number" || body.amount <= 0) {
    throw new BadRequestError("Amount must be a positive number.", ERROR_CODES.VALIDATION_ERROR);
  }

  if (typeof body.riskScore !== "number" || body.riskScore < 0 || body.riskScore > 100) {
    throw new BadRequestError("Risk score must be between 0 and 100.", ERROR_CODES.VALIDATION_ERROR);
  }

  if (body.status !== undefined && (typeof body.status !== "string" || !validStatuses.has(body.status))) {
    throw new BadRequestError("Status is invalid.", ERROR_CODES.VALIDATION_ERROR);
  }

  if (body.notes !== undefined && typeof body.notes !== "string") {
    throw new BadRequestError("Notes must be a string.", ERROR_CODES.VALIDATION_ERROR);
  }

  return body as unknown as CreateLoanApplicationInput;
};

const validateUpdatePayload = (body: Record<string, unknown>): UpdateLoanApplicationInput => {
  if (Object.keys(body).length === 0) {
    throw new BadRequestError("At least one field is required for update.", ERROR_CODES.VALIDATION_ERROR);
  }

  if (body.applicant !== undefined && (typeof body.applicant !== "string" || body.applicant.trim().length === 0)) {
    throw new BadRequestError("Applicant must be a non-empty string.", ERROR_CODES.VALIDATION_ERROR);
  }

  if (body.amount !== undefined && (typeof body.amount !== "number" || body.amount <= 0)) {
    throw new BadRequestError("Amount must be a positive number.", ERROR_CODES.VALIDATION_ERROR);
  }

  if (
    body.riskScore !== undefined &&
    (typeof body.riskScore !== "number" || body.riskScore < 0 || body.riskScore > 100)
  ) {
    throw new BadRequestError("Risk score must be between 0 and 100.", ERROR_CODES.VALIDATION_ERROR);
  }

  if (body.status !== undefined && (typeof body.status !== "string" || !validStatuses.has(body.status))) {
    throw new BadRequestError("Status is invalid.", ERROR_CODES.VALIDATION_ERROR);
  }

  if (body.notes !== undefined && typeof body.notes !== "string") {
    throw new BadRequestError("Notes must be a string.", ERROR_CODES.VALIDATION_ERROR);
  }

  return body as unknown as UpdateLoanApplicationInput;
};

export const getLoans = (_req: Request, res: Response): void => {
  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: listLoans(),
  });
};

export const getLoan = (req: Request, res: Response): void => {
  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: getLoanById(req.params.id),
  });
};

export const postLoan = (req: Request, res: Response): void => {
  const loan = createLoan(validateCreatePayload(req.body as Record<string, unknown>));

  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    data: loan,
  });
};

export const patchLoan = (req: Request, res: Response): void => {
  const loan = updateLoan(req.params.id, validateUpdatePayload(req.body as Record<string, unknown>));

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: loan,
  });
};

export const removeLoan = (req: Request, res: Response): void => {
  const loan = deleteLoan(req.params.id);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: loan,
  });
};
