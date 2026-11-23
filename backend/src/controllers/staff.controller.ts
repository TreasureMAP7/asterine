import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";

export class StaffController {
  getStaff = async (req: AuthRequest, res: Response) => {
    return res.status(501).json({
      success: false,
      message: "Not implemented yet",
    });
  };

  getStaffById = async (req: AuthRequest, res: Response) => {
    return res.status(501).json({
      success: false,
      message: "Not implemented yet",
    });
  };

  removeStaff = async (req: AuthRequest, res: Response) => {
    return res.status(501).json({
      success: false,
      message: "Not implemented yet",
    });
  };
}

export default new StaffController();
