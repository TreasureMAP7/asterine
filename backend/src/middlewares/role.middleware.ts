import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

export const isOwner = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  if (req.user?.role !== "owner") {
    return res.status(403).json({
      success: false,
      message: "Access denied, restaurant owner only",
    });
  }

  next();
};

export const isStaff = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  if (!["owner", "staff"].includes(req.user?.role ?? "")) {
    return res.status(403).json({
      success: false,
      message: "Access denied, restaurant staff only",
    });
  }

  next();
};

export const isAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied, admin only",
    });
  }

  next();
};
