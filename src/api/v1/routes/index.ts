import { Router } from "express";
import healthRoutes from "./healthRoutes";
import loanRoutes from "./loanRoutes";
import userRoutes from "./userRoutes";
import adminRoutes from "./adminRoutes";

const router = Router();

router.use("/health", healthRoutes);
router.use("/loans", loanRoutes);
router.use("/users", userRoutes);
router.use("/admin", adminRoutes);

export default router;
