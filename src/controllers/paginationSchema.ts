import { NUMBER_REGEX } from "@/lib/regex";
import { z } from "zod";

export const paginationSchema = z.object({
  page: z
    .string()
    .regex(NUMBER_REGEX, "page should be a number")
    .optional()
    .default("1")
    .transform((s) => parseInt(s, 10)),
  limit: z
    .string()
    .regex(NUMBER_REGEX, "limit should be a number")
    .optional()
    .default("10")
    .transform((s) => parseInt(s, 10)),
});
