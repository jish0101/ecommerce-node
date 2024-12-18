"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategory = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const subCategorySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    category: {
        type: mongoose_1.default.Schema.ObjectId,
        required: true,
        ref: "Category"
    }
}, { timestamps: true });
exports.SubCategory = mongoose_1.default.model("SubCategory", subCategorySchema);
//# sourceMappingURL=sub-category.model.js.map