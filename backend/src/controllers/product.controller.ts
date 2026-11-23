import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";

export class ProductController {
  createProduct = async (req: AuthRequest, res: Response) => {
    return res.status(501).json({
      success: false,
      message: "Not implemented yet",
    });
  };

  getProducts = async (req: Request, res: Response) => {
    return res.status(501).json({
      success: false,
      message: "Not implemented yet",
    });
  };

  getproductById = async (req: Request, res: Response) => {
    return res.status(501).json({
      success: false,
      message: "Not implemented yet",
    });
  };

  updateProduct = async (req: AuthRequest, res: Response) => {
    return res.status(501).json({
      success: false,
      message: "Not implemented yet",
    });
  };

  updateProductImage = async (req: AuthRequest, res: Response) => {
    return res.status(501).json({
      success: false,
      message: "Not implemented yet",
    });
  };

  deleteProduct = async (req: AuthRequest, res: Response) => {
    return res.status(501).json({
      success: false,
      message: "Not implemented yet",
    });
  };
}

export default new ProductController();
