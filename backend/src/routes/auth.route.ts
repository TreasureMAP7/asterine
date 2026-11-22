import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { uploadSingleImage } from "../middlewares/upload.middleware";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

router.get("/profile", authenticate, AuthController.getUser);

router.patch("/profile", authenticate, AuthController.updateProfile);
router.patch("/password", authenticate, AuthController.changePassword);
router.patch(
  "/profile/image",
  authenticate,
  uploadSingleImage,
  AuthController.updateProfileImage,
);

export default router;
