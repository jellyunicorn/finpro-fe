import z from "zod";

export const addressSchema = z.object({
  label: z
    .string()
    .min(1, "Label is required")
    .max(50, "Label must not exceed 50 characters"),
  address: z
    .string()
    .min(1, "Address is required")
    .max(100, "Address must not exceed 100 characters"),
  regencyCode: z
    .string()
    .min(1, "City / Regency is required")
    .refine((v) => v !== "-", "City / Regency is required"),
  districtCode: z
    .string()
    .min(1, "District is required")
    .refine((v) => v !== "-", "District is required"),
  villageCode: z
    .string()
    .min(1, "Village is required")
    .refine((v) => v !== "-", "Village is required"),
  postalCode: z
    .string()
    .regex(/^\d{5}$/, "Postal code must be exactly 5 digits"),
});