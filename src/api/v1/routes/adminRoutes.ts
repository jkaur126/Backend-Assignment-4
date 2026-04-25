import { Router } from "express";
import { setUserRole } from "../controllers/adminController";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post("/claims", authenticate, authorize({ allowedRoles: ["admin"] }), asyncHandler(setUserRole));

export default router;
