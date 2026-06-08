import { z } from "zod";

export const OrderItemSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Name is required"),
  quantity: z
    .number()
    .min(1, "Quantity must be at least 1"),
});

export const OrderItemFormSchema = z.object({
  items: z.array(OrderItemSchema),
});

export type OrderItemFormValues = z.infer<typeof OrderItemFormSchema>;