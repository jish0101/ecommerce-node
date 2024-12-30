"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGoogleCallback = exports.authenticateGoogle = exports.authenticateJwt = void 0;
const passport_1 = __importDefault(require("passport"));
const jwt_1 = __importDefault(require("./strategies/jwt"));
const google_1 = __importDefault(require("./strategies/google"));
passport_1.default.use(jwt_1.default);
passport_1.default.use(google_1.default);
const authenticateJwt = () => passport_1.default.authenticate("jwt", { session: false });
exports.authenticateJwt = authenticateJwt;
const authenticateGoogle = () => passport_1.default.authenticate("google", {
    session: false,
    scope: ["openid", "profile", "email"],
});
exports.authenticateGoogle = authenticateGoogle;
const authGoogleCallback = () => passport_1.default.authenticate("google", {
    session: false,
    failureRedirect: "/auth/login?auth=failed",
});
exports.authGoogleCallback = authGoogleCallback;
exports.default = passport_1.default;
//# sourceMappingURL=passport.js.map