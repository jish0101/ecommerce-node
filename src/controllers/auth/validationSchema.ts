import z from "zod";
import { NUMBER_REGEX } from "@/lib/regex";
import bcrypt from "bcryptjs";

export const authSchema = z.object({
  email: z.string().email("email format is not valid"),
  password: z.string().min(1, "password is required"),
});

export const verifyUserSchema = z.object({
  _id: z.string(),
  userId: z.string().min(1, "userId is required"),
  password: z
    .string()
    .optional()
    .transform((s) => {
      if (s) {
        return bcrypt.hashSync(s, 10);
      }
      return "";
    }),
  type: z.enum(["EMAIL VERIFICATION", "FORGOT PASSWORD"]),
  value: z
    .string()
    .refine((n) => NUMBER_REGEX.test(n), "Provide valid otp to validate user")
    .transform((s) => parseInt(s, 10)),
});

export const sendOtpSchema = z.object({
  userId: z.string().min(1, "userId is required"),
  type: z.enum(["EMAIL VERIFICATION", "FORGOT PASSWORD"], {
    message: `Supported otp types are: "EMAIL VERIFICATION", "FORGOT PASSWORD"`,
  }),
});
