"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAddressSchema = void 0;
const zod_1 = require("zod");
exports.createAddressSchema = zod_1.z.object({
    isPrimary: zod_1.z.boolean().default(false),
    pinCode: zod_1.z
        .number()
        .int()
        .nonnegative({ message: "Pin code must be a positive integer" }),
    country: zod_1.z
        .string()
        .min(1, "Country is required")
        .transform((val) => val.toLowerCase()),
    state: zod_1.z
        .string()
        .min(1, "State is required")
        .transform((val) => val.toLowerCase()),
    city: zod_1.z
        .string()
        .min(1, "City is required")
        .transform((val) => val.toLowerCase()),
    street: zod_1.z
        .string()
        .min(1, "Street is required")
        .transform((val) => val.toLowerCase()),
});
//# sourceMappingURL=validationSchema.js.map