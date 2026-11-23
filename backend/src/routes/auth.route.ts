import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { uploadSingleImage } from "../middlewares/upload.middleware";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

router.use(authenticate);

router.get("/me", AuthController.getUser);

router.patch("/profile", AuthController.updateProfile);
router.patch("/password", AuthController.changePassword);
router.patch(
  "/profile/image",

  uploadSingleImage,
  AuthController.updateProfileImage,
);
router.delete("/delete", AuthController.deleteUser);

export default router;
