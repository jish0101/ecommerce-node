import { NUMBER_REGEX } from "@/lib/regex";
import z from "zod";

export const authSchema = z.object({
  email: z.string().email("email format is not valid"),
  password: z.string().min(1, "password is required"),
});

export const verifyUserSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  type: z.enum(["EMAIL VERIFICATION", "FORGOT PASSWORD"]),
  value: z
    .string()
    .refine((n) => NUMBER_REGEX.test(n), "Provide valid otp to validate user")
    .transform((s) => parseInt(s, 10)),
});
