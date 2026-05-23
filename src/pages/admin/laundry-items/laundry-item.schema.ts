import { z } from "zod";

export const laundryItemSchema = z.object({
  name: z
    .string()
    .min(2, "Nama minimal 2 karakter")
    .max(50, "Nama maksimal 50 karakter"),
  description: z.string().max(200, "Deskripsi maksimal 200 karakter").optional(),
  isActive: z.boolean(),
});

export type LaundryItemFormData = z.infer<typeof laundryItemSchema>;
