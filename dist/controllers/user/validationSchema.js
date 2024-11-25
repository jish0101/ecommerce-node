"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileFileSchema = exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const regex_1 = require("../../lib/regex");
exports.createUserSchema = zod_1.default.object({
    userName: zod_1.default.string().min(4, "userName should be at least 4 character long"),
    email: zod_1.default.string().email("email format is not valid"),
    password: zod_1.default
        .string()
        .min(8, "password should be at least 8 character long")
        .max(28, "password should be at most 28 character long")
        .regex(regex_1.PASSWORD_REGEX, "minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character")
        .transform((pwd) => bcryptjs_1.default.hashSync(pwd)),
});
exports.updateUserSchema = zod_1.default.object({
    userName: zod_1.default.string().min(4, "userName should be at least 4 character long"),
    email: zod_1.default.string().email("email format is not valid"),
    otp_id: zod_1.default.string().optional(),
    otp_value: zod_1.default.number().optional(),
});
exports.profileFileSchema = zod_1.default.object({
    buffer: zod_1.default.instanceof(Buffer),
    destination: zod_1.default.string(),
    fieldname: zod_1.default.string(),
    filename: zod_1.default.string(),
    mimetype: zod_1.default.string(),
    originalname: zod_1.default.string(),
    path: zod_1.default.string(),
    size: zod_1.default.number(),
    stream: zod_1.default.any(),
    encoding: zod_1.default.string(),
});
//# sourceMappingURL=validationSchema.js.map