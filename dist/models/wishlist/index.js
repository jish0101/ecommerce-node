"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const WishlistItemsSchema = new mongoose_1.default.Schema({
    productId: { type: mongoose_1.default.Schema.ObjectId, ref: "Product", required: true },
});
const WishlistSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.ObjectId, ref: "User", required: true },
    items: [WishlistItemsSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
WishlistSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});
const Wishlist = mongoose_1.default.model("Wishlist", WishlistSchema);
exports.default = Wishlist;
//# sourceMappingURL=index.js.map