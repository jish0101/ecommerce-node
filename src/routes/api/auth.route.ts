import express from "express";
import { rateLimit } from "express-rate-limit";
import { asyncWrapper } from "@/lib/helpers";
import AuthController from "@/controllers/auth/auth.controller";

const router = express.Router();
const authController = new AuthController();

const strictRateLimiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 1,
  message:
    "You can only make one request every 2 minutes. Please try again later.",
});

router.post("/login", asyncWrapper(authController.login));
router.post("/logout", asyncWrapper(authController.logout));
router.post("/refresh", asyncWrapper(authController.refreshToken));
router.post("/verify-user", asyncWrapper(authController.verifyUser));

router.post("/reset-password", asyncWrapper(authController.resetPassword));
router.post(
  "/send-otp",
  strictRateLimiter,
  asyncWrapper(authController.sendOtp),
);

export default router;
