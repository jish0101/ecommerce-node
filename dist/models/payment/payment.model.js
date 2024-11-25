"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payments = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const paymentSchema = new mongoose_1.default.Schema({
    orderId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Order",
    },
    status: {
        type: String,
        enum: ["due", "paid", "returned"],
        default: "due",
    },
    razorpay_order_id: {
        type: String,
        default: "",
    },
    razorpay_payment_id: {
        type: String,
        default: "",
    },
    razorpay_signature: {
        type: String,
        default: "",
    },
});
exports.Payments = mongoose_1.default.model("Payments", paymentSchema);
//# sourceMappingURL=payment.model.js.map