import { HTTP_STATUS } from "../../../constants/httpStatus";
import type { ErrorCode } from "../../../constants/errorCodes";

export interface AppErrorOptions {
  code: ErrorCode;
  statusCode: number;
  details?: unknown;
}

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: number;
  public readonly details?: unknown;

  public constructor(message: string, options: AppErrorOptions) {
    super(message);
    this.name = this.constructor.name;
    this.code = options.code;
    this.statusCode = options.statusCode;
    this.details = options.details;
  }
}

export class BadRequestError extends AppError {
  public constructor(message: string, code: ErrorCode, details?: unknown) {
    super(message, { code, statusCode: HTTP_STATUS.BAD_REQUEST, details });
  }
}

export class AuthenticationError extends AppError {
  public constructor(message: string, code: ErrorCode, details?: unknown) {
    super(message, { code, statusCode: HTTP_STATUS.UNAUTHORIZED, details });
  }
}

export class AuthorizationError extends AppError {
  public constructor(message: string, code: ErrorCode, details?: unknown) {
    super(message, { code, statusCode: HTTP_STATUS.FORBIDDEN, details });
  }
}

export class NotFoundError extends AppError {
  public constructor(message: string, code: ErrorCode, details?: unknown) {
    super(message, { code, statusCode: HTTP_STATUS.NOT_FOUND, details });
  }
}

export class InternalServerError extends AppError {
  public constructor(message: string, code: ErrorCode, details?: unknown) {
    super(message, { code, statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR, details });
  }
}
