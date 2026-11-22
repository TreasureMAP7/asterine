import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username can't be more than 50 characters"),

  email: z
    .email("Invalid email address")
    .max(100, "Email can't be more than 100 characters"),

  phone: z
    .string()
    .min(8, "Phone number must be at least 8 characters")
    .max(20, "Phone can't be more than 20 characters"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password can't be more than 72 characters"),
});

export const loginSchema = z.object({
  email: z
    .email("Invalid email address")
    .max(100, "Email can't be more than 100 characters"),

  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const updateProfileSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(50, "Username can't be more than 50 characters")
      .optional(),

    email: z
      .email("Invalid email address")
      .max(100, "Email can't be more than 100 characters")
      .optional(),

    phone: z
      .string()
      .min(8, "Phone number must be at least 8 characters")
      .max(20, "Phone number can't be more than 20 characters")
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Provide at least one field for updates",
  });

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),

    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters")
      .max(72, "New password can't be more than 72 characters"),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
  });
