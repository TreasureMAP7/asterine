import { Request, Response } from "express"
import { AuthRequest } from "../middlewares/auth.middleware";

export class CategoryController {
  createCategory = async (req: AuthRequest, res: Response) => {
    return res.status(501).json({
      success: false,
      message: "Not implemented yet",
    });
  };

  getCategories = async (req: Request, res: Response) => {
    return res.status(501).json({
      success: false,
      message: "Not implemented yet",
    });
  };

  getCategoryById = async (req: Request, res: Response) => {
    return res.status(501).json({
      success: false,
      message: "Not implemented yet",
    });
  };

  updateCategory = async (req: AuthRequest, res: Response) => {
    return res.status(501).json({
      success: false,
      message: "Not implemented yet",
    });
  };

  deleteCategory = async (req: AuthRequest, res: Response) => {
    return res.status(501).json({
      success: false,
      message: "Not implemented yet",
    });
  };
}

export default new CategoryController();
