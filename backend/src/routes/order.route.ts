import { Router } from "express";
import OrderController from "../controllers/order.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { isStaff } from "../middlewares/role.middleware";

const router = Router();

router.use(authenticate);

router.post("/", OrderController.createOrder);
router.get("/", OrderController.getOrders);
router.get("/:orderId", OrderController.getOrderById);

router.patch("/:orderId/status", isStaff, OrderController.updateOrderStatus);

export default router;
