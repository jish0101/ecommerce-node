import { z } from "zod";

export const createSubCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Sub category name is required")
    .max(28, "Sub category name cannot be more than 28 characters long"),
  category: z.string().min(1, "Category is required").max(100, "Max 100 chars allowed")
});
