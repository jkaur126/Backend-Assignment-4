import type { NextFunction, Request, Response } from "express";
import { toErrorResponse } from "../utils/errorResponse";
import { writeErrorLog } from "../../../config/logger";
import { NotFoundError } from "../errors/AppError";
import { ERROR_CODES } from "../../../constants/errorCodes";

export const notFoundHandler = (req: Request, _res: Response, next: NextFunction): void => {
  next(new NotFoundError(`Route not found: ${req.method} ${req.originalUrl}`, ERROR_CODES.RESOURCE_NOT_FOUND));
};

export const errorHandler = (error: unknown, req: Request, res: Response, next: NextFunction): void => {
  const { statusCode, body } = toErrorResponse(error);
  void next;

  writeErrorLog(
    JSON.stringify({
      timestamp: body.timestamp,
      method: req.method,
      path: req.originalUrl,
      statusCode,
      error: body.error,
    }),
  );

  res.status(statusCode).json(body);
};
