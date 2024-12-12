import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().trim().toLowerCase(),
  desc: z.string().max(1000, "Desc too large").trim().toLowerCase(),
  category: z.string(),
  price: z
    .string()
    .trim()
    .transform((s) => parseInt(s, 10))
    .refine((s) => !isNaN(s) && s >= 1, {
      message: "Price must be a valid number greater than or equal to 1",
    }),
  stock: z
    .string()
    .trim()
    .transform((s) => parseInt(s, 10))
    .refine((s) => !isNaN(s) && s >= 1, {
      message: "Stocks must be a valid number greater than or equal to 1",
    }),
  imageLinks: z.array(z.string()).default([]),
});
