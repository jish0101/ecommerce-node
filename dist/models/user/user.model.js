"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    fullName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: false,
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false,
    },
    role: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER",
    },
    refreshToken: {
        type: String,
    },
    profileImage: {
        type: String,
    },
    userType: {
        type: String,
        enum: ["jwt", "google"],
        default: "jwt",
    },
}, { timestamps: true });
exports.User = mongoose_1.default.model("User", userSchema);
//# sourceMappingURL=user.model.js.map