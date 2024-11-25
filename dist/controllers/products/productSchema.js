"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductSchema = void 0;
const zod_1 = require("zod");
exports.createProductSchema = zod_1.z.object({
    name: zod_1.z.string(),
    desc: zod_1.z.string().max(1000, "Desc too large"),
    category: zod_1.z.string(),
    price: zod_1.z
        .string()
        .transform((s) => parseInt(s, 10))
        .refine((s) => !isNaN(s) && s >= 1, {
        message: "Price must be a valid number greater than or equal to 1",
    }),
    stock: zod_1.z
        .string()
        .transform((s) => parseInt(s, 10))
        .refine((s) => !isNaN(s) && s >= 1, {
        message: "Stocks must be a valid number greater than or equal to 1",
    }),
    imageLinks: zod_1.z.array(zod_1.z.string()).default([]),
});
//# sourceMappingURL=productSchema.js.map