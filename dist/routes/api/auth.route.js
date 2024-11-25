"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helpers_1 = require("../../lib/helpers");
const express_rate_limit_1 = require("express-rate-limit");
const auth_controller_1 = __importDefault(require("../../controllers/auth/auth.controller"));
const passport_1 = require("../../middlewares/passport");
const googleAuth_controller_1 = __importDefault(require("../../controllers/google-auth/googleAuth.controller"));
const router = express_1.default.Router();
const authController = new auth_controller_1.default();
const googleAuthController = new googleAuth_controller_1.default();
const strictRateLimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 2 * 60 * 1000,
    max: 1,
    message: "One request in 2 minutes allowed. Try again later.",
});
// Auth routes
router.post("/login", (0, helpers_1.asyncWrapper)(authController.login));
router.post("/logout", (0, helpers_1.asyncWrapper)(authController.logout));
router.post("/refresh", (0, helpers_1.asyncWrapper)(authController.refreshToken));
router.post("/verify-user", (0, helpers_1.asyncWrapper)(authController.verifyUser));
router.post("/reset-password", (0, helpers_1.asyncWrapper)(authController.resetPassword));
// OTP sending endpoint with rate limit
router.post("/send-otp", strictRateLimiter, (0, helpers_1.asyncWrapper)(authController.sendOtp));
// Google auth routes
router.get("/google", (0, passport_1.authenticateGoogle)());
router.get("/google/callback", (0, passport_1.authGoogleCallback)(), googleAuthController.handleSuccess);
exports.default = router;
//# sourceMappingURL=auth.route.js.map