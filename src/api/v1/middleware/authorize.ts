import type { NextFunction, Request, Response } from "express";
import { ERROR_CODES } from "../../../constants/errorCodes";
import { AuthorizationError } from "../errors/AppError";
import type { UserRole } from "../types/auth";

export interface AuthorizationOptions {
  allowedRoles: UserRole[];
}

export const authorize = ({ allowedRoles }: AuthorizationOptions) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const userRole = res.locals.user?.role;

    if (!userRole) {
      return next(
        new AuthorizationError("Forbidden: No role found for the authenticated user.", ERROR_CODES.ROLE_NOT_FOUND),
      );
    }

    if (!allowedRoles.includes(userRole)) {
      return next(
        new AuthorizationError("Forbidden: Insufficient role.", ERROR_CODES.INSUFFICIENT_ROLE, {
          allowedRoles,
          userRole,
        }),
      );
    }

    return next();
  };
};
