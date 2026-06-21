import { z } from "zod";

export const passwordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const registerAccountSchema = z.object({
    email: z.email(),
    fullName: z
      .string()
      .min(1, "Your name must be more than 1 character")
      .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")
  })