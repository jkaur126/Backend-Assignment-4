import { ERROR_CODES } from "../../../constants/errorCodes";
import { HTTP_STATUS } from "../../../constants/httpStatus";
import { AppError } from "../errors/AppError";

export interface ErrorResponseBody {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  timestamp: string;
}

export const toErrorResponse = (error: unknown): { statusCode: number; body: ErrorResponseBody } => {
  if (error instanceof AppError) {
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
    statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    body: {
      success: false,
      error: {
        code: ERROR_CODES.INTERNAL_SERVER_ERROR,
        message: "An unexpected error occurred.",
      },
      timestamp: new Date().toISOString(),
    },
  };
};
