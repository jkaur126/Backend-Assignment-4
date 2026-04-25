import type { Request, Response } from "express";
import { getFirebaseAuth } from "../../../config/firebase";
import { HTTP_STATUS } from "../../../constants/httpStatus";
import { ERROR_CODES } from "../../../constants/errorCodes";
import { BadRequestError } from "../errors/AppError";

export const getCurrentUser = async (_req: Request, res: Response): Promise<void> => {
  const uid = res.locals.user?.uid;

  if (!uid) {
    throw new BadRequestError("Authenticated user is missing from request context.", ERROR_CODES.BAD_REQUEST);
  }

  const userRecord = await getFirebaseAuth().getUser(uid);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: {
      uid: userRecord.uid,
      email: userRecord.email,
      customClaims: userRecord.customClaims ?? {},
    },
  });
};
