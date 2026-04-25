"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const healthRoutes_1 = __importDefault(require("./healthRoutes"));
const loanRoutes_1 = __importDefault(require("./loanRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const adminRoutes_1 = __importDefault(require("./adminRoutes"));
const router = (0, express_1.Router)();
router.use("/health", healthRoutes_1.default);
router.use("/loans", loanRoutes_1.default);
router.use("/users", userRoutes_1.default);
router.use("/admin", adminRoutes_1.default);
exports.default = router;
