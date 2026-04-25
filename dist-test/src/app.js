"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./api/v1/routes"));
const logger_1 = require("./config/logger");
const errorHandler_1 = require("./api/v1/middleware/errorHandler");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(logger_1.requestLogger);
app.use(logger_1.consoleLogger);
app.use(express_1.default.json());
app.use("/api/v1", routes_1.default);
app.use(errorHandler_1.notFoundHandler);
app.use(errorHandler_1.errorHandler);
exports.default = app;
