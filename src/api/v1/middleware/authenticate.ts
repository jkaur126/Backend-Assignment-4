import type { NextFunction, Request, Response } from "express";
import { ERROR_CODES } from "../../../constants/errorCodes";
import { AuthenticationError } from "../errors/AppError";
import { getTokenVerifier } from "../utils/tokenVerifier";
import type { AuthenticatedUser } from "../types/auth";

const extractBearerToken = (authorizationHeader?: string): string | null => {
  if (!authorizationHeader) {
    return null;
  }

  const [scheme, token] = authorizationHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return null;
  }

  return token;
};

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = extractBearerToken(req.header("Authorization"));

    if (!token) {
      return next(
        new AuthenticationError("Unauthorized: Missing bearer token.", ERROR_CODES.TOKEN_NOT_FOUND),
      );
    }

    const verifiedToken = await getTokenVerifier().verifyIdToken(token);

    const user: AuthenticatedUser = {
      uid: verifiedToken.uid,
      email: verifiedToken.email,
      role: typeof verifiedToken.role === "string" ? (verifiedToken.role as AuthenticatedUser["role"]) : undefined,
      claims: verifiedToken,
    };

    res.locals.user = user;
    return next();
  } catch (error) {
    return next(
      new AuthenticationError("Unauthorized: Invalid token.", ERROR_CODES.TOKEN_INVALID, {
        reason: error instanceof Error ? error.message : "Unknown token verification error",
      }),
    );
  }
};
