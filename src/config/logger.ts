import fs from "node:fs";
import path from "node:path";
import morgan from "morgan";
import type { RequestHandler } from "express";

const logsDir = path.resolve(process.cwd(), "src", "logs");

const ensureLogDirectory = (): void => {
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }
};

ensureLogDirectory();

const accessLogStream = fs.createWriteStream(path.join(logsDir, "access.log"), { flags: "a" });

export const requestLogger: RequestHandler = morgan("combined", {
  stream: accessLogStream,
});

export const consoleLogger: RequestHandler = morgan("dev");

export const writeErrorLog = (message: string): void => {
  ensureLogDirectory();
  fs.appendFileSync(path.join(logsDir, "error.log"), `${message}\n`, "utf8");
};
