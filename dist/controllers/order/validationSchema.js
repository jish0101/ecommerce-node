"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletedOrderSchema = exports.updateOrderSchema = exports.createOrderSchema = void 0;
const zod_1 = require("zod");
exports.createOrderSchema = zod_1.z.object({
    productData: zod_1.z.array(zod_1.z.object({
        productId: zod_1.z.string(),
        quantity: zod_1.z.number().positive(),
    })),
});
exports.updateOrderSchema = zod_1.z.object({
    orderId: zod_1.z.string(),
    status: zod_1.z.enum(["CANCELLED"]),
});
exports.deletedOrderSchema = zod_1.z.object({
    orderId: zod_1.z.string(),
});
//# sourceMappingURL=validationSchema.js.map