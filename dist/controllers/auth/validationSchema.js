"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtpSchema = exports.verifyUserSchema = exports.authSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const regex_1 = require("../../lib/regex");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.authSchema = zod_1.default.object({
    email: zod_1.default.string().email("email format is not valid"),
    password: zod_1.default.string().min(1, "password is required"),
});
exports.verifyUserSchema = zod_1.default.object({
    _id: zod_1.default.string(),
    userId: zod_1.default.string().min(1, "userId is required"),
    password: zod_1.default
        .string()
        .optional()
        .transform((s) => {
        if (s) {
            return bcryptjs_1.default.hashSync(s, 10);
        }
        return "";
    }),
    type: zod_1.default.enum(["EMAIL VERIFICATION", "FORGOT PASSWORD"]),
    value: zod_1.default
        .string()
        .refine((n) => regex_1.NUMBER_REGEX.test(n), "Provide valid otp to validate user")
        .transform((s) => parseInt(s, 10)),
});
exports.sendOtpSchema = zod_1.default.object({
    email: zod_1.default.string().trim().max(100, "email is too large").optional(),
    userId: zod_1.default.string().trim().max(100, "userId is too large").optional(),
    type: zod_1.default.enum(["EMAIL VERIFICATION", "FORGOT PASSWORD"], {
        message: `Supported otp types are: "EMAIL VERIFICATION", "FORGOT PASSWORD"`,
    }),
});
//# sourceMappingURL=validationSchema.js.map