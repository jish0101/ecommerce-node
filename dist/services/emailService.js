"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const keys_1 = require("../lib/keys");
const mailTransporter_1 = __importDefault(require("./mailTransporter"));
const customError_1 = require("../lib/customError");
const otpTypeSubjectMap = {
    "EMAIL VERIFICATION": "Email verification information",
    "FORGOT PASSWORD": "Password reset information",
};
const templateDir = {
    "EMAIL VERIFICATION": ["otp-templates", "otp.ejs"],
    "FORGOT PASSWORD": ["otp-templates", "otp.ejs"],
};
class Mailer {
    sendConfirmationOtp(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const transporter = (0, mailTransporter_1.default)();
            const { email, otpVal, userName, type } = config;
            yield ejs_1.default.renderFile(path_1.default.resolve(__dirname, "..", "templates", ...templateDir[type]), { userName, otpVal }, function (err, html) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        throw new customError_1.CustomError("Server error", 500);
                    }
                    yield transporter.sendMail({
                        from: `"Joy" ${keys_1.KEYS.EMAIL_USER}`,
                        to: email,
                        subject: otpTypeSubjectMap[type],
                        html,
                    });
                    console.info(`Successfully sent an email to ${email} of type: ${templateDir[type].toString()}`);
                });
            });
        });
    }
}
exports.default = Mailer;
//# sourceMappingURL=emailService.js.map