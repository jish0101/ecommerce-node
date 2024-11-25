"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategorySchema = void 0;
const zod_1 = require("zod");
exports.createCategorySchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, "Category name is required")
        .max(28, "Category name cannot be more than 28 characters long"),
});
//# sourceMappingURL=validationSchema.js.map