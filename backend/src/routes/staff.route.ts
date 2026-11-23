import { Router } from "express";
import StaffController from "../controllers/staff.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { isOwner } from "../middlewares/role.middleware";

const router = Router();

router.use(authenticate, isOwner);

router.get("/", StaffController.getStaff);
router.get("/:staffId", StaffController.getStaffById);
router.delete("/:staffId", StaffController.removeStaff);

export default router;
