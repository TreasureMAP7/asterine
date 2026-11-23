import { Router } from "express";
import RestaurantController from "../controllers/restaurant.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { isOwner } from "../middlewares/role.middleware";
import productRoutes from "./product.route";
import categoryRoutes from "./category.route";

const router = Router();

router.get("/", RestaurantController.getRestaurants);
router.get("/:restaurantId", RestaurantController.getRestaurantById);

router.use("/:restaurantId/products", productRoutes);
router.use("/:restaurantId/categories", categoryRoutes);

router.use(authenticate);

router.post("/", RestaurantController.createRestaurant);

router.patch("/me", isOwner, RestaurantController.updateRestaurant);
router.patch("/me/image", isOwner, RestaurantController.updateRestaurantImage);
router.delete("/me", isOwner, RestaurantController.deleteRestaurant);

export default router;
