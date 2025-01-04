import { z } from "zod";
import { getNextDayDate } from "@/lib/dates";

export const createSchema = z.object({
  expiry: z.date().optional(),
  maxDiscount: z.number().min(1),
  name: z.string().min(3).max(255),
  minOrderValue: z.number().min(1),
  discountPercent: z.number().min(1).max(99),
});
