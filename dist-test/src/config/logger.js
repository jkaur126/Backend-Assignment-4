"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeErrorLog = exports.consoleLogger = exports.requestLogger = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const morgan_1 = __importDefault(require("morgan"));
const logsDir = node_path_1.default.resolve(process.cwd(), "src", "logs");
const ensureLogDirectory = () => {
    if (!node_fs_1.default.existsSync(logsDir)) {
        node_fs_1.default.mkdirSync(logsDir, { recursive: true });
    }
};
ensureLogDirectory();
const accessLogStream = node_fs_1.default.createWriteStream(node_path_1.default.join(logsDir, "access.log"), { flags: "a" });
exports.requestLogger = (0, morgan_1.default)("combined", {
    stream: accessLogStream,
});
exports.consoleLogger = (0, morgan_1.default)("dev");
const writeErrorLog = (message) => {
    ensureLogDirectory();
    node_fs_1.default.appendFileSync(node_path_1.default.join(logsDir, "error.log"), `${message}\n`, "utf8");
};
exports.writeErrorLog = writeErrorLog;
