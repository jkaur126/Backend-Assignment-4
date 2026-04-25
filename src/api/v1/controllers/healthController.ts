import type { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpStatus";

export const healthCheck = (_req: Request, res: Response): void => {
  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: {
      status: "ok",
      service: "high-risk-loan-monitoring-system",
      timestamp: new Date().toISOString(),
    },
  });
};
