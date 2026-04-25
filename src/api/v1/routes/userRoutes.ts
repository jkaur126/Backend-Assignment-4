import { Router } from "express";
import { getCurrentUser } from "../controllers/userController";
import { authenticate } from "../middleware/authenticate";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/me", authenticate, asyncHandler(getCurrentUser));

export default router;
