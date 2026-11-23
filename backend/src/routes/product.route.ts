import { Router } from "express";
import ProductController from "../controllers/product.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { isStaff } from "../middlewares/role.middleware";

const router = Router({ mergeParams: true });

router.get("/", ProductController.getProducts);
router.get("/:productId", ProductController.getproductById);

router.use(authenticate, isStaff);

router.post("/", ProductController.createProduct);
router.patch("/:productId", ProductController.updateProduct);
router.patch("/:productId/image", ProductController.updateProductImage);
router.delete("/:productId", ProductController.deleteProduct);

export default router;
