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
        unique: true,
        lowercase: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER",
    },
    refreshToken: {
        type: String,
        required: false,
    },
    profileImage: {
        type: String,
        required: false,
    },
    userType: {
        type: String,
        enum: ["jwt", "google"],
        default: "jwt",
    },
}, { timestamps: true });
exports.User = mongoose_1.default.model("User", userSchema);
//# sourceMappingURL=user.model.js.map