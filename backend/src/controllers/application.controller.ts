import { Response } from "express"
import { AuthRequest } from "../middlewares/auth.middleware";

export class ApplicationController {
  createEmployment = async (req: AuthRequest, res: Response) => {
    return res.status(501).json({
      success: false,
      message: "Not implemented yet",
    });
  };

  createResignation = async (req: AuthRequest, res: Response) => {
    return res.status(501).json({
      success: false,
      message: "Not implemented yet",
    });
  };

  getApplications = async (req: AuthRequest, res: Response) => {
    return res.status(501).json({
      success: false,
      message: "Not implemented yet",
    });
  };

  getApplicationById = async (req: AuthRequest, res: Response) => {
    return res.status(501).json({
      success: false,
      message: "Not implemented yet",
    });
  };

  updateApplicationStatus = async (req: AuthRequest, res: Response) => {
    return res.status(501).json({
      success: false,
      message: "Not implemented yet",
    });
  };
}

export default new ApplicationController();
