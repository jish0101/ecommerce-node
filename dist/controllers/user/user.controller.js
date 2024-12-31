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
const responseHelpers_1 = require("../../lib/responseHelpers");
const validationSchema_1 = require("./validationSchema");
const user_model_1 = require("../../models/user/user.model");
const customError_1 = require("../../lib/customError");
const idSchema_1 = __importDefault(require("../idSchema"));
const ImageService_1 = __importDefault(require("../../services/ImageService"));
const otpService_1 = __importDefault(require("../../services/otpService"));
const emailService_1 = __importDefault(require("../../services/emailService"));
const helpers_1 = require("../../lib/helpers");
const paginationSchema_1 = require("../paginationSchema");
class UserController {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, limit } = paginationSchema_1.paginationSchema.parse(req.query);
            const [users, total] = yield Promise.all([
                user_model_1.User.find()
                    .skip((page - 1) * limit)
                    .limit(limit)
                    .select("-password -__v -refreshToken")
                    .lean(),
                user_model_1.User.countDocuments()
            ]);
            res.json((0, responseHelpers_1.createResponse)(200, users, "Successfully fetched users", { page, limit, total }));
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = validationSchema_1.createUserSchema.parse(req.body);
            const isAlreadyExisting = yield user_model_1.User.findOne({
                $or: [{ email: result.email }],
            });
            if (isAlreadyExisting) {
                throw new customError_1.CustomError("User with this email/username already exists", 400);
            }
            const otpService = new otpService_1.default();
            const user = yield user_model_1.User.create({
                fullName: `${result.firstName} ${result.lastName}`,
                email: result.email,
                password: result.password,
            });
            if (!user) {
                throw new customError_1.CustomError("Failed to create user", 500);
            }
            const { fullName, email, isVerified, role, _id } = user;
            const createdOtp = yield otpService.createOtp({
                type: "EMAIL VERIFICATION",
                userId: _id,
            });
            const mailer = new emailService_1.default();
            const emailSent = yield mailer.sendConfirmationOtp({
                email,
                userName: fullName,
                type: createdOtp.type,
                otpVal: createdOtp.value,
            });
            if (!emailSent) {
                throw new customError_1.CustomError("Failed to send otp", 500);
            }
            res.json((0, responseHelpers_1.createResponse)(200, { fullName, email, isVerified, role, _id }, "Successfully created user", { otp: (0, helpers_1.removeFields)(createdOtp, ["value", "expiresAt", "isUsed"]) }));
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const payloadUser = req.user;
            const body = validationSchema_1.updateUserSchema.parse(req.body);
            const user = yield user_model_1.User.findById(payloadUser._id);
            if (!user) {
                throw new customError_1.CustomError("User not found", 404);
            }
            // user is adding new email
            if (user.email !== body.email) {
                if (!body.otp_id || !body.otp_value) {
                    throw new customError_1.CustomError("Email cannot be changed without otp_id, otp_value", 400);
                }
                // check if anothe user has same email if yes return
                const existingUser = yield user_model_1.User.findOne({ email: body.email });
                if (existingUser) {
                    throw new customError_1.CustomError("Email cannot be changed, duplicate user found.", 400);
                }
                const otpService = new otpService_1.default();
                yield otpService.verifyOtp({
                    _id: body.otp_id,
                    value: body.otp_value,
                    type: "EMAIL VERIFICATION",
                    userId: user._id,
                });
            }
            const updatedUser = yield user_model_1.User.findByIdAndUpdate(payloadUser._id, {
                userName: body.userName,
                email: body.email,
            }, { new: true })
                .select("-__v -refreshToken -password")
                .lean();
            if (!updatedUser) {
                throw new customError_1.CustomError("Server error", 500);
            }
            res.json((0, responseHelpers_1.createResponse)(200, updatedUser, "Successfully updated user"));
        });
    }
    updateProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.file) {
                throw new customError_1.CustomError("image file is missing", 400);
            }
            const user = req.user;
            if (!user) {
                throw new customError_1.CustomError("user is missing", 404);
            }
            const foundUser = yield user_model_1.User.findById(user._id);
            if (!foundUser) {
                throw new customError_1.CustomError("user not found", 404);
            }
            const opm = new ImageService_1.default(req.file);
            if (foundUser.profileImage) {
                opm.deleteImageByLink(foundUser.profileImage, foundUser.email);
            }
            const image = yield opm.getProfileImg({
                w: 400,
                h: 400,
                q: 80,
                folder: foundUser.email,
            });
            if (!image) {
                throw new customError_1.CustomError("Failed to upload profile", 500);
            }
            foundUser.profileImage = image;
            yield foundUser.save();
            res.json((0, responseHelpers_1.createResponse)(200, image, "Successfully uploaded profile"));
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = idSchema_1.default.parse(req.query);
            const deletedUser = yield user_model_1.User.findByIdAndDelete(id)
                .select("-password -__v")
                .lean();
            return res.json((0, responseHelpers_1.createResponse)(200, deletedUser, "Successfully deleted user"));
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map