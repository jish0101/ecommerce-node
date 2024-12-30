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
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = require("../../lib/customError");
const keys_1 = require("../../lib/keys");
const user_model_1 = require("../../models/user/user.model");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const googleAuthStrategy = new passport_google_oauth20_1.Strategy({
    clientID: keys_1.KEYS.GOOGLE_CLIENT_ID,
    clientSecret: keys_1.KEYS.GOOGLE_CLIENT_SECRET,
    callbackURL: `${keys_1.KEYS.BASE_URL}/auth/google/callback`,
    passReqToCallback: true,
}, function (request, accessToken, refreshToken, profile, done) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        try {
            const foundEmail = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a.find((mail) => mail.verified === true);
            let found = yield user_model_1.User.findOne({
                email: foundEmail ? foundEmail.value : "",
            }).lean();
            if (!found) {
                const user = yield user_model_1.User.create({
                    role: "USER",
                    password: "",
                    refreshToken: "",
                    email: foundEmail ? foundEmail.value : "",
                    fullName: profile.displayName,
                    isVerified: foundEmail ? true : false,
                    profileImage: (_d = (_c = (_b = profile.photos) === null || _b === void 0 ? void 0 : _b.at(0)) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : "",
                    userType: "google",
                });
                if (!user) {
                    return done(new customError_1.CustomError("Failed to login with google", 500), false);
                }
                const payload = {
                    _id: String(user._id),
                    role: user.role,
                    fullName: user.fullName,
                    email: user.email,
                    profileImage: user.profileImage,
                    isVerified: user.isVerified,
                    userType: user.userType,
                };
                return done(null, payload);
            }
            const payload = {
                _id: String(found._id),
                role: found.role,
                fullName: found.fullName,
                email: found.email,
                profileImage: found.profileImage,
                isVerified: found.isVerified,
                userType: found.userType,
            };
            return done(null, payload);
        }
        catch (error) {
            console.log("error => ", error);
            return done(new customError_1.CustomError("Failed to login with google", 500), false);
        }
    });
});
exports.default = googleAuthStrategy;
//# sourceMappingURL=google.js.map