"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationSchema = void 0;
const regex_1 = require("../lib/regex");
const zod_1 = require("zod");
exports.paginationSchema = zod_1.z.object({
    page: zod_1.z
        .string()
        .regex(regex_1.NUMBER_REGEX, "page should be a number")
        .optional()
        .default("1")
        .transform((s) => parseInt(s, 10)),
    limit: zod_1.z
        .string()
        .regex(regex_1.NUMBER_REGEX, "limit should be a number")
        .optional()
        .default("10")
        .transform((s) => parseInt(s, 10)),
});
//# sourceMappingURL=paginationSchema.js.map