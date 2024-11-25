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
const customError_1 = require("../lib/customError");
const Otp_1 = require("../models/otp/Otp");
const crypto_1 = __importDefault(require("crypto"));
class OtpService {
    createOtp(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userId, type }) {
            const otp = crypto_1.default.randomInt(100000, 999999).toString();
            const expiresAt = Date.now() + 5 * 60 * 1000;
            const createdOtp = yield Otp_1.Otp.create({
                user: userId,
                type: type,
                value: parseInt(otp, 10),
                expiresAt,
            });
            return createdOtp.toObject();
        });
    }
    verifyOtp(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userId, type, _id, value }) {
            const result = yield Otp_1.Otp.findOne({
                _id,
                user: userId,
                type,
                isUsed: false,
            }).lean();
            if (!result) {
                throw new customError_1.CustomError("Otp not found", 404);
            }
            if (result.value !== value || Date.now() > result.expiresAt) {
                throw new customError_1.CustomError("Otp is not valid/expired", 400);
            }
            const updated = yield Otp_1.Otp.findByIdAndUpdate(_id, { isUsed: true }).lean();
            if (!updated) {
                throw new customError_1.CustomError("Server error: failed to update otp status", 500);
            }
            return true;
        });
    }
}
exports.default = OtpService;
//# sourceMappingURL=otpService.js.map