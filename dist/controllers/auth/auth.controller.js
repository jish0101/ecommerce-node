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
const validationSchema_1 = require("./validationSchema");
const Otp_1 = require("../../models/otp/Otp");
const emailService_1 = __importDefault(require("../../services/emailService"));
const helpers_1 = require("../../lib/helpers");
const customError_1 = require("../../lib/customError");
const otpService_1 = __importDefault(require("../../services/otpService"));
const tokenService_1 = __importDefault(require("../../services/tokenService"));
const responseHelpers_1 = require("../../lib/responseHelpers");
const user_model_1 = require("../../models/user/user.model");
class AuthController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = validationSchema_1.authSchema.parse(req.body);
            const user = yield user_model_1.User.findOne({ email: result.email });
            if (!user) {
                throw new customError_1.CustomError("Credentials are not valid", 400);
            }
            const { email, fullName, _id, isVerified, role, profileImage, userType } = user;
            const payloadUser = {
                _id: String(_id),
                email,
                isVerified,
                role,
                fullName,
                profileImage,
                userType,
            };
            const tokens = new tokenService_1.default();
            const accessToken = tokens.getToken(payloadUser, "access");
            const refreshToken = tokens.getToken(payloadUser, "refresh");
            user.refreshToken = refreshToken;
            yield user.save();
            payloadUser.accessToken = accessToken;
            res.cookie("refresh_token", refreshToken, {
                path: "/",
                httpOnly: true,
                sameSite: "lax",
                maxAge: 1000 * 60 * 60 * 24,
            });
            res.json((0, responseHelpers_1.createResponse)(200, payloadUser, "Successfully logged-in user"));
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cookies = req.cookies;
            if (!cookies.refresh_token) {
                return res.json((0, responseHelpers_1.createResponse)(200, null, "Successfully logged-out user"));
            }
            res.clearCookie("refresh_token", {
                path: "/",
                httpOnly: true,
                sameSite: "lax",
                maxAge: 1000 * 60 * 60 * 24,
            });
            res.json((0, responseHelpers_1.createResponse)(200, null, "Successfully logged-out user"));
        });
    }
    refreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cookies = req.cookies;
            if (!cookies || !cookies.refresh_token) {
                throw new customError_1.CustomError("Credentials are not valid", 400);
            }
            const tokens = new tokenService_1.default();
            const isOk = tokens.verifyToken(cookies.refresh_token);
            if (!isOk) {
                throw new customError_1.CustomError("Credentials are not valid", 400);
            }
            const { _id, email, isVerified, role, fullName, profileImage, userType } = isOk;
            const accessToken = tokens.getToken({ _id, email, isVerified, role, fullName, profileImage, userType }, "access");
            res.json((0, responseHelpers_1.createResponse)(200, Object.assign(Object.assign({}, isOk), { accessToken }), "Successfully updated auth"));
        });
    }
    verifyUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id, userId, value, type } = validationSchema_1.verifyUserSchema.parse(req.body);
            const otpService = new otpService_1.default();
            const result = yield otpService.verifyOtp({ _id, userId, value, type });
            if (result) {
                const updatedUser = yield user_model_1.User.findByIdAndUpdate(userId, {
                    isVerified: true,
                });
                if (!updatedUser) {
                    throw new customError_1.CustomError("Server error: failed to verify user", 500);
                }
            }
            return res.json((0, responseHelpers_1.createResponse)(200, result, "Successfully verified user"));
        });
    }
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id, userId, value, type, password } = validationSchema_1.verifyUserSchema.parse(req.body);
            if (type !== "FORGOT PASSWORD") {
                throw new customError_1.CustomError(`Otp type is invalid: ${type}`, 400, false);
            }
            if (!password) {
                throw new customError_1.CustomError(`Password is required`, 400, false);
            }
            const otp = yield Otp_1.Otp.findOne({ _id, isUsed: false });
            if (!otp) {
                throw new customError_1.CustomError(`Otp not found`, 404, false);
            }
            const otpService = new otpService_1.default();
            const result = yield otpService.verifyOtp({ _id, userId, value, type });
            if (!result) {
                throw new customError_1.CustomError(`Otp is not valid`, 400, false);
            }
            otp.isUsed = true;
            yield otp.save();
            const updatedUser = yield user_model_1.User.findByIdAndUpdate(userId, { password });
            if (!updatedUser) {
                throw new customError_1.CustomError("Server Error: failed to reset password", 500, false);
            }
            return res.json((0, responseHelpers_1.createResponse)(200, true, "Successfully updated user password"));
        });
    }
    sendOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, email, type } = validationSchema_1.sendOtpSchema.parse(req.body);
            const otpService = new otpService_1.default();
            const user = yield user_model_1.User.findOne({ $or: [{ _id: userId }, { email }] });
            if (!user) {
                throw new customError_1.CustomError("User not found", 404, false);
            }
            if (user.isVerified && type === "EMAIL VERIFICATION") {
                throw new customError_1.CustomError("User is already verified", 400, false);
            }
            const createdOtp = yield otpService.createOtp({
                userId: user._id,
                type,
            });
            const mailer = new emailService_1.default();
            yield mailer.sendConfirmationOtp({
                email: user.email,
                otpVal: createdOtp.value,
                userName: user.fullName,
                type,
            });
            return res.json((0, responseHelpers_1.createResponse)(200, true, `Successfully sent an otp to ${user.email}`, {
                otp: (0, helpers_1.removeFields)(createdOtp, ["value", "expiresAt", "isUsed"]),
            }));
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map