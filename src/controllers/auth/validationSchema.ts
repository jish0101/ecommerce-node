import z from "zod";

export const authSchema = z.object({
  email: z.string().email("email format is not valid"),
  password: z.string().min(1, "password is required"),
});
