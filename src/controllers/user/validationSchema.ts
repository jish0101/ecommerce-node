import z from "zod";
import bcryptjs from "bcryptjs";
import { PASSWORD_REGEX } from "@/lib/regex";

export const createUserSchema = z.object({
  userName: z.string().min(4, "userName should be at least 4 character long"),
  email: z.string().email("email format is not valid"),
  password: z
    .string()
    .min(8, "password should be at least 8 character long")
    .max(28, "password should be at most 28 character long")
    .regex(
      PASSWORD_REGEX,
      "minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
    )
    .transform((pwd) => bcryptjs.hashSync(pwd)),
});

export const updateUserSchema = z.object({
  _id: z.string(),
  userName: z.string().min(4, "userName should be at least 4 character long"),
  email: z.string().email("email format is not valid"),
  otp_id: z.string().optional(),
  otp_value: z.number().optional(),
});
