import { Response } from "express"
import { AuthRequest } from "../middlewares/auth.middleware";

export class OrderController {
  createOrder = async (req: AuthRequest, res: Response) => {
    return res.status(501).json({
      success: false,
      message: "Not implemented yet",
    });
  };

  getOrders = async (req: AuthRequest, res: Response) => {
    return res.status(501).json({
      success: false,
      message: "Not implemented yet",
    });
  };

  getOrderById = async (req: AuthRequest, res: Response) => {
    return res.status(501).json({
      success: false,
      message: "Not implemented yet",
    });
  };

  updateOrderStatus = async (req: AuthRequest, res: Response) => {
    return res.status(501).json({
      success: false,
      message: "Not implemented yet",
    });
  };
}

export default new OrderController();
