"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coupon = void 0;
const dates_1 = require("../../lib/dates");
const mongoose_1 = __importDefault(require("mongoose"));
const couponSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    expiry: {
        type: Date,
        required: true,
        default: () => (0, dates_1.getNextDayDate)(1),
    },
    discountPercent: {
        type: Number,
        required: true,
    },
    maxDiscount: {
        type: Number,
        required: true,
    },
    minOrderValue: {
        type: Number,
        required: true,
    },
}, { timestamps: true });
exports.Coupon = mongoose_1.default.model("Coupon", couponSchema);
//# sourceMappingURL=index.js.map