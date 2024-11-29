import z from "zod";
import bcryptjs from "bcryptjs";
import { PASSWORD_REGEX } from "@/lib/regex";

export const createUserSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100, "First name cannot be more than 100 characters"),
  lastName: z.string().trim().min(1, "First name is required").max(100, "First name cannot be more than 100 characters"),
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
  userName: z.string().min(4, "userName should be at least 4 character long"),
  email: z.string().email("email format is not valid"),
  otp_id: z.string().optional(),
  otp_value: z.number().optional(),
});

export const profileFileSchema = z.object({
  buffer: z.instanceof(Buffer),
  destination: z.string(),
  fieldname: z.string(),
  filename: z.string(),
  mimetype: z.string(),
  originalname: z.string(),
  path: z.string(),
  size: z.number(),
  stream: z.any(),
  encoding: z.string(),
});
