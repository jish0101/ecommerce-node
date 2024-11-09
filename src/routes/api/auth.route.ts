import express from "express";
import { asyncWrapper } from "@/lib/helpers";
import AuthController from "@/controllers/auth/auth.controller";

const router = express.Router();
const authController = new AuthController();

router.post("/login", asyncWrapper(authController.login));
router.post("/logout", asyncWrapper(authController.logout));
router.post("/refresh", asyncWrapper(authController.refreshToken));

export default router;
