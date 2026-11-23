import { Router } from "express";
import CategoryController from "../controllers/category.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { isStaff } from "../middlewares/role.middleware";

const router = Router({ mergeParams: true });

router.get("/", CategoryController.getCategories);
router.get("/:categoryId", CategoryController.getCategoryById);

router.use(authenticate, isStaff);

router.post("/", CategoryController.createCategory);
router.patch("/:categoryId", CategoryController.updateCategory);
router.delete("/:categoryId", CategoryController.deleteCategory);

export default router;
