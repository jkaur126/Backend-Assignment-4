"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const errorCodes_1 = require("../../../constants/errorCodes");
const AppError_1 = require("../errors/AppError");
const authorize = ({ allowedRoles }) => {
    return (req, res, next) => {
        const userRole = res.locals.user?.role;
        if (!userRole) {
            return next(new AppError_1.AuthorizationError("Forbidden: No role found for the authenticated user.", errorCodes_1.ERROR_CODES.ROLE_NOT_FOUND));
        }
        if (!allowedRoles.includes(userRole)) {
            return next(new AppError_1.AuthorizationError("Forbidden: Insufficient role.", errorCodes_1.ERROR_CODES.INSUFFICIENT_ROLE, {
                allowedRoles,
                userRole,
            }));
        }
        return next();
    };
};
exports.authorize = authorize;
