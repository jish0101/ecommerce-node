"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Otp = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const otpSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ["EMAIL VERIFICATION", "FORGOT PASSWORD", "EMAIL CHANGE"],
    },
    isUsed: {
        type: Boolean,
        required: true,
        default: false,
    },
    value: {
        type: Number,
        required: true,
    },
    expiresAt: {
        type: Number,
        required: true,
    },
});
exports.Otp = mongoose_1.default.model("Otp", otpSchema);
//# sourceMappingURL=Otp.js.map