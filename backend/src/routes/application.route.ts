import { Router } from "express";
import ApplicationController from "../controllers/application.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { isOwner, isStaff } from "../middlewares/role.middleware";

const router = Router();

router.use(authenticate);

router.post("/", ApplicationController.createEmployment);
router.post("/resign", isStaff, ApplicationController.createResignation);

router.get("/", ApplicationController.getApplications);
router.get("/:applicationId", ApplicationController.getApplicationById);
router.get(
  "/:applicationId/status",
  isOwner,
  ApplicationController.updateApplicationStatus,
);

export default router;
