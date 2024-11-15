import { z } from "zod";

export const createOrderSchema = z.array(
  z.object({
    productId: z.string(),
    quantity: z.number().positive(),
  }),
);

export const updateOrderSchema = z.object({
  orderId: z.string(),
  status: z.enum(["CANCELLED"]),
});

export const deletedOrderSchema = z.object({
  orderId: z.string(),
});
