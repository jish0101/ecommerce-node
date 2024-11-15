import { z } from "zod";

export const createAddressSchema = z.object({
  isPrimary: z.boolean().default(false),
  pinCode: z
    .number()
    .int()
    .nonnegative({ message: "Pin code must be a positive integer" }),
  country: z
    .string()
    .min(1, "Country is required")
    .transform((val) => val.toLowerCase()),
  state: z
    .string()
    .min(1, "State is required")
    .transform((val) => val.toLowerCase()),
  city: z
    .string()
    .min(1, "City is required")
    .transform((val) => val.toLowerCase()),
  street: z
    .string()
    .min(1, "Street is required")
    .transform((val) => val.toLowerCase()),
});

export type AddressT = z.infer<typeof createAddressSchema>;
