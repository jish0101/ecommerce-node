import express from "express";
import { asyncWrapper } from "@/lib/helpers";
import { rateLimit } from "express-rate-limit";
import AuthController from "@/controllers/auth/auth.controller";
import { authenticateGoogle, authGoogleCallback } from "@/middlewares/passport";
import GoogleAuthController from "@/controllers/google-auth/googleAuth.controller";

const router = express.Router();
const authController = new AuthController();
const googleAuthController = new GoogleAuthController();

const strictRateLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  max: 1, // only 1 request allowed within the time window
  message:
    "You can only make one request every 2 minutes. Please try again later.",
});

// Auth Routes
router.post("/login", asyncWrapper(authController.login));
router.post("/logout", asyncWrapper(authController.logout));
router.post("/refresh", asyncWrapper(authController.refreshToken));
router.post("/verify-user", asyncWrapper(authController.verifyUser));
router.post("/reset-password", asyncWrapper(authController.resetPassword));

// OTP Sending with rate limit
router.post(
  "/send-otp",
  strictRateLimiter,
  asyncWrapper(authController.sendOtp),
);

// Google Auth Routes
router.get(
  "/google",
  (req, res, next) => {
    console.log("FIRST");
    next();
  },
  authenticateGoogle(),
);
router.get(
  "/google/callback",
  (req, res, next) => {
    console.log("SECOND");
    next();
  },
  authGoogleCallback(),
);

// Google Auth Success and Failure
router.post("/google/failure", googleAuthController.handleFailure);
router.post("/google/success", googleAuthController.handleSuccess);

export default router;
