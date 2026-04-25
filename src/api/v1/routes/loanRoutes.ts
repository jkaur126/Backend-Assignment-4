import { Router } from "express";
import { getLoan, getLoans, patchLoan, postLoan, removeLoan } from "../controllers/loanController";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";

const router = Router();

router.get("/", authenticate, authorize({ allowedRoles: ["analyst", "manager", "admin"] }), getLoans);
router.get("/:id", authenticate, authorize({ allowedRoles: ["analyst", "manager", "admin"] }), getLoan);
router.post("/", authenticate, authorize({ allowedRoles: ["manager", "admin"] }), postLoan);
router.patch("/:id", authenticate, authorize({ allowedRoles: ["manager", "admin"] }), patchLoan);
router.delete("/:id", authenticate, authorize({ allowedRoles: ["admin"] }), removeLoan);

export default router;
