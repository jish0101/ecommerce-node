import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string(),
  desc: z.string().max(1000, "Desc too large"),
  category: z.string(),
  price: z.number().positive(),
  stock: z.number().positive(),
  imageLinks: z.array(z.string()),
});
