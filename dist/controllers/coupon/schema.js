"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSchema = void 0;
const zod_1 = require("zod");
exports.createSchema = zod_1.z.object({
    expiry: zod_1.z.date().optional(),
    maxDiscount: zod_1.z.number().min(1),
    name: zod_1.z.string().min(3).max(255),
    minOrderValue: zod_1.z.number().min(1),
    discountPercent: zod_1.z.number().min(1).max(99),
});
//# sourceMappingURL=schema.js.map