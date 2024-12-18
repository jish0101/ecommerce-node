"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubCategorySchema = void 0;
const zod_1 = require("zod");
exports.createSubCategorySchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, "Sub category name is required")
        .max(28, "Sub category name cannot be more than 28 characters long"),
    category: zod_1.z.string().min(1, "Category is required").max(100, "Max 100 chars allowed")
});
//# sourceMappingURL=validationSchema.js.map