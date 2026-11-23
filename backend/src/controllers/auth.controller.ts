import { Request, Response } from "express";
import {
  registerSchema,
  loginSchema,
  updateProfileSchema,
  changePasswordSchema,
} from "../validations/auth.validation";
import { db } from "../config/db";
import { and, eq, or } from "drizzle-orm";
import { usersTable } from "../config/schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AuthRequest } from "../middlewares/auth.middleware";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../services/cloudinary.service";

dotenv.config();

export class AuthController {
  register = async (req: Request, res: Response) => {
    try {
      const validation = registerSchema.safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: validation.error.issues,
        });
      }

      const { username, email, phone, password } = validation.data;

      const existingUser = await db.query.usersTable.findFirst({
        where: or(eq(usersTable.email, email), eq(usersTable.phone, phone)),
      });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message:
            existingUser.email === email
              ? "Email already exists"
              : "Phone number already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const [insertedUser] = await db
        .insert(usersTable)
        .values({
          username,
          email,
          phone,
          password: hashedPassword,
          role: "user",
          restaurantId: null,
        })
        .$returningId();

      const newUser = await db.query.usersTable.findFirst({
        where: eq(usersTable.id, insertedUser.id),
      });

      if (!newUser) {
        return res.status(500).json({
          success: false,
          message: "Failed to retrieve registered user",
        });
      }

      return res.status(201).json({
        success: true,
        message: "Register successful",
        data: {
          user: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            phone: newUser.phone,
            role: newUser.role,
            restaurantId: newUser.restaurantId,
          },
        },
      });
    } catch (error) {
      console.error("Register error:", error);

      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const validation = loginSchema.safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: validation.error.issues,
        });
      }

      const { email, password } = validation.data;

      const user = await db.query.usersTable.findFirst({
        where: and(
          eq(usersTable.email, email),
          eq(usersTable.isDeleted, false),
        ),
      });

      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Email not found",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({
          success: false,
          message: "Email or password incorrect",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          role: user.role,
        },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "7d",
        },
      );

      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            role: user.role,
            restaurantId: user.restaurantId,
            imageUrl: user.imageUrl,
          },
        },
      });
    } catch (error) {
      console.error("Login error:", error);

      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };

  getUser = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized, try to log in",
        });
      }

      const user = await db.query.usersTable.findFirst({
        where: and(eq(usersTable.id, userId), eq(usersTable.isDeleted, false)),
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        data: {
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            role: user.role,
            imageUrl: user.imageUrl,
            restaurantId: user.restaurantId,
          },
        },
      });
    } catch (error) {
      console.error("Get user error:", error);

      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };

  updateProfile = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized, try to log in",
        });
      }

      const validation = updateProfileSchema.safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: validation.error.issues,
        });
      }

      const { username, email, phone } = validation.data;

      const existingUser = await db.query.usersTable.findFirst({
        where: and(
          eq(usersTable.isDeleted, false),
          or(
            email ? eq(usersTable.email, email) : undefined,
            phone ? eq(usersTable.phone, phone) : undefined,
          ),
        ),
      });

      if (existingUser && existingUser.id !== userId) {
        return res.status(409).json({
          success: false,
          message:
            existingUser.email === email
              ? "Email already exists"
              : "Phone number already exists",
        });
      }

      await db
        .update(usersTable)
        .set({
          username,
          email,
          phone,
        })
        .where(eq(usersTable.id, userId));

      // Get updated user
      const updatedUser = await db.query.usersTable.findFirst({
        where: eq(usersTable.id, userId),
      });

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: {
          user: {
            id: updatedUser?.id,
            username: updatedUser?.username,
            email: updatedUser?.email,
            phone: updatedUser?.phone,
            role: updatedUser?.role,
            restaurantId: updatedUser?.restaurantId,
          },
        },
      });
    } catch (error) {
      console.error("Update profile error:", error);

      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };

  changePassword = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized, try to log in",
        });
      }

      const validation = changePasswordSchema.safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: validation.error.issues,
        });
      }

      const { currentPassword, newPassword } = validation.data;

      const user = await db.query.usersTable.findFirst({
        where: and(eq(usersTable.id, userId), eq(usersTable.isDeleted, false)),
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password,
      );

      if (!isPasswordValid) {
        return res.status(400).json({
          success: false,
          message: "Current password is incorrect",
        });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await db
        .update(usersTable)
        .set({
          password: hashedPassword,
        })
        .where(eq(usersTable.id, userId));

      return res.status(200).json({
        success: true,
        message: "Password changed successfully",
      });
    } catch (error) {
      console.error("Change password error:", error);

      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };

  updateProfileImage = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized, try to log in",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Profile image is required",
        });
      }

      const user = await db.query.usersTable.findFirst({
        where: and(eq(usersTable.id, userId), eq(usersTable.isDeleted, false)),
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const uploadedImage = await uploadToCloudinary(req.file.buffer);

      await db
        .update(usersTable)
        .set({
          imageUrl: uploadedImage.secure_url,
          imagePublicId: uploadedImage.public_id,
        })
        .where(eq(usersTable.id, userId));

      if (user.imagePublicId) {
        try {
          await deleteFromCloudinary(user.imagePublicId);
        } catch (error) {
          console.error("Failed to delete old profile image:", error);
        }
      }

      return res.status(200).json({
        success: true,
        message: "Profile image updated successfully",
        data: {
          imageUrl: uploadedImage.secure_url,
        },
      });
    } catch (error) {
      console.error("Update profile image error:", error);

      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };

  deleteUser = async (req: AuthRequest, res: Response) => {
    return res.status(501).json({
      success: false,
      message: "Not implemented yet",
    });
  };
}

export default new AuthController();
