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
const keys_1 = require("../../lib/keys");
const user_model_1 = require("../../models/user/user.model");
const passport_jwt_1 = require("passport-jwt");
const options = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys_1.KEYS.JWT_SECRET,
};
const jwtStrategy = new passport_jwt_1.Strategy(options, (jwtPayload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.User.findById(jwtPayload._id);
        if (user) {
            const payloadUser = {
                _id: String(user._id),
                role: user.role,
                email: user.email,
                userType: user.userType,
                fullName: user.fullName,
                isVerified: user.isVerified,
                profileImage: user.profileImage,
            };
            return done(null, payloadUser);
        }
        return done(null, false);
    }
    catch (error) {
        return done(error, false);
    }
}));
exports.default = jwtStrategy;
//# sourceMappingURL=jwt.js.map