"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    desc: {
        type: String,
        required: true,
        lowercase: true,
    },
    category: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: "Category",
        required: true,
    },
    categoryName: {
        type: String,
        required: true,
    },
    subCategory: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: "SubCategory",
        required: true,
    },
    subCategoryName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        default: 0,
    },
    stock: {
        type: Number,
        default: 0,
    },
    imageLinks: {
        type: [String],
        default: [],
    },
    updatedBy: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createdBy: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });
productSchema.index({ name: "text", "category.name": "text", "subCategory.name": "text" });
exports.Product = mongoose_1.default.model("Product", productSchema);
//# sourceMappingURL=product.model.js.map