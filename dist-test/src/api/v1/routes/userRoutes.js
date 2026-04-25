"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authenticate_1 = require("../middleware/authenticate");
const asyncHandler_1 = require("../utils/asyncHandler");
const router = (0, express_1.Router)();
router.get("/me", authenticate_1.authenticate, (0, asyncHandler_1.asyncHandler)(userController_1.getCurrentUser));
exports.default = router;
