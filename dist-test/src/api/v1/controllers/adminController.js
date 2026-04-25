"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUserRole = void 0;
const firebase_1 = require("../../../config/firebase");
const httpStatus_1 = require("../../../constants/httpStatus");
const errorCodes_1 = require("../../../constants/errorCodes");
const AppError_1 = require("../errors/AppError");
const validRoles = new Set(["analyst", "manager", "admin"]);
const setUserRole = async (req, res) => {
    const { uid, role } = req.body;
    if (!uid || typeof uid !== "string") {
        throw new AppError_1.BadRequestError("uid is required.", errorCodes_1.ERROR_CODES.VALIDATION_ERROR);
    }
    if (!role || !validRoles.has(role)) {
        throw new AppError_1.BadRequestError("role must be one of analyst, manager, or admin.", errorCodes_1.ERROR_CODES.VALIDATION_ERROR);
    }
    await (0, firebase_1.getFirebaseAuth)().setCustomUserClaims(uid, { role });
    res.status(httpStatus_1.HTTP_STATUS.OK).json({
        success: true,
        data: {
            uid,
            role,
            message: "Custom claims updated successfully.",
        },
    });
};
exports.setUserRole = setUserRole;
