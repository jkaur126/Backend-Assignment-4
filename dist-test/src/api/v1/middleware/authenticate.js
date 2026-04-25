"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const errorCodes_1 = require("../../../constants/errorCodes");
const AppError_1 = require("../errors/AppError");
const tokenVerifier_1 = require("../utils/tokenVerifier");
const extractBearerToken = (authorizationHeader) => {
    if (!authorizationHeader) {
        return null;
    }
    const [scheme, token] = authorizationHeader.split(" ");
    if (scheme !== "Bearer" || !token) {
        return null;
    }
    return token;
};
const authenticate = async (req, res, next) => {
    try {
        const token = extractBearerToken(req.header("Authorization"));
        if (!token) {
            return next(new AppError_1.AuthenticationError("Unauthorized: Missing bearer token.", errorCodes_1.ERROR_CODES.TOKEN_NOT_FOUND));
        }
        const verifiedToken = await (0, tokenVerifier_1.getTokenVerifier)().verifyIdToken(token);
        const user = {
            uid: verifiedToken.uid,
            email: verifiedToken.email,
            role: typeof verifiedToken.role === "string" ? verifiedToken.role : undefined,
            claims: verifiedToken,
        };
        res.locals.user = user;
        return next();
    }
    catch (error) {
        return next(new AppError_1.AuthenticationError("Unauthorized: Invalid token.", errorCodes_1.ERROR_CODES.TOKEN_INVALID, {
            reason: error instanceof Error ? error.message : "Unknown token verification error",
        }));
    }
};
exports.authenticate = authenticate;
