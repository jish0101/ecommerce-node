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
  windowMs: 2 * 60 * 1000,
  max: 1,
  message: "One request in 2 minutes allowed. Try again later.",
});

// Auth routes
router.post("/login", asyncWrapper(authController.login));
router.post("/logout", asyncWrapper(authController.logout));
router.post("/refresh", asyncWrapper(authController.refreshToken));
router.post("/verify-user", asyncWrapper(authController.verifyUser));
router.post("/reset-password", asyncWrapper(authController.resetPassword));

// OTP sending endpoint with rate limit
router.post(
  "/send-otp",
  strictRateLimiter,
  asyncWrapper(authController.sendOtp),
);

// Google auth routes
router.get("/google", authenticateGoogle());
router.get(
  "/google/callback",
  authGoogleCallback(),
  googleAuthController.handleSuccess,
);

export default router;
