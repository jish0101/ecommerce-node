"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const addSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    isPrimary: {
        type: Boolean,
        required: true,
        default: false,
    },
    pinCode: {
        type: Number,
        required: true,
    },
    country: {
        type: String,
        required: true,
        lowercase: true,
    },
    state: {
        type: String,
        required: true,
        lowercase: true,
    },
    city: {
        type: String,
        required: true,
        lowercase: true,
    },
    street: {
        type: String,
        required: true,
        lowercase: true,
    },
}, { timestamps: true });
exports.Address = mongoose_1.default.model("Address", addSchema);
//# sourceMappingURL=address.model.js.map