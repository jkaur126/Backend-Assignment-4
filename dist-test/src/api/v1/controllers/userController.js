"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = void 0;
const firebase_1 = require("../../../config/firebase");
const httpStatus_1 = require("../../../constants/httpStatus");
const errorCodes_1 = require("../../../constants/errorCodes");
const AppError_1 = require("../errors/AppError");
const getCurrentUser = async (_req, res) => {
    const uid = res.locals.user?.uid;
    if (!uid) {
        throw new AppError_1.BadRequestError("Authenticated user is missing from request context.", errorCodes_1.ERROR_CODES.BAD_REQUEST);
    }
    const userRecord = await (0, firebase_1.getFirebaseAuth)().getUser(uid);
    res.status(httpStatus_1.HTTP_STATUS.OK).json({
        success: true,
        data: {
            uid: userRecord.uid,
            email: userRecord.email,
            customClaims: userRecord.customClaims ?? {},
        },
    });
};
exports.getCurrentUser = getCurrentUser;
