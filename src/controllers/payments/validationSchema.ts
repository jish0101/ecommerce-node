import { z } from "zod";

export const createPaymentOrder = z.object({
  orderId: z.string().min(1, "orderId is required"),
});

export const paymentSchema = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
});
