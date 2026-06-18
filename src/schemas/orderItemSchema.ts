import { z } from "zod";

export const OrderItemSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Name is required"),
  quantity: z
    .number("Input a number")
    .min(1, "Quantity must be >1"),
});

export const OrderItemFormSchema = z.object({
  items: z.array(OrderItemSchema),
});

export type OrderItemFormValues = z.infer<typeof OrderItemFormSchema>;