import type { Request, Response } from "express";
import { getFirebaseAuth } from "../../../config/firebase";
import { HTTP_STATUS } from "../../../constants/httpStatus";
import { ERROR_CODES } from "../../../constants/errorCodes";
import { BadRequestError } from "../errors/AppError";
import type { UserRole } from "../types/auth";

const validRoles = new Set<UserRole>(["analyst", "manager", "admin"]);

export const setUserRole = async (req: Request, res: Response): Promise<void> => {
  const { uid, role } = req.body as { uid?: string; role?: UserRole };

  if (!uid || typeof uid !== "string") {
    throw new BadRequestError("uid is required.", ERROR_CODES.VALIDATION_ERROR);
  }

  if (!role || !validRoles.has(role)) {
    throw new BadRequestError("role must be one of analyst, manager, or admin.", ERROR_CODES.VALIDATION_ERROR);
  }

  await getFirebaseAuth().setCustomUserClaims(uid, { role });

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: {
      uid,
      role,
      message: "Custom claims updated successfully.",
    },
  });
};
