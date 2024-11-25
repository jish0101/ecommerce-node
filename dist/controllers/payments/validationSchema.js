"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentSchema = exports.createPaymentOrder = void 0;
const zod_1 = require("zod");
exports.createPaymentOrder = zod_1.z.object({
    orderId: zod_1.z.string().min(1, "orderId is required"),
});
exports.paymentSchema = zod_1.z.object({
    razorpay_order_id: zod_1.z.string(),
    razorpay_payment_id: zod_1.z.string(),
    razorpay_signature: zod_1.z.string(),
});
//# sourceMappingURL=validationSchema.js.map