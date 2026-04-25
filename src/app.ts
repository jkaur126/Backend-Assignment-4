import express from "express";
import cors from "cors";
import apiV1Routes from "./api/v1/routes";
import { consoleLogger, requestLogger } from "./config/logger";
import { errorHandler, notFoundHandler } from "./api/v1/middleware/errorHandler";

const app = express();

app.use(cors());
app.use(requestLogger);
app.use(consoleLogger);
app.use(express.json());

app.use("/api/v1", apiV1Routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
