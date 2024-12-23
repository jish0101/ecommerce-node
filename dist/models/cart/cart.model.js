"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CartItemSchema = new mongoose_1.default.Schema({
    productId: { type: mongoose_1.default.Schema.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
});
const CartSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.ObjectId, ref: "User", required: true },
    items: [CartItemSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
CartSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});
const Cart = mongoose_1.default.model("Cart", CartSchema);
exports.default = Cart;
//# sourceMappingURL=cart.model.js.map