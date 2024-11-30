import express from "express";
import { KEYS } from "../lib/keys";
import apiRoutes from "./api/routes";
import authRouter from "./api/auth.route";
import userRouter from "./api/user.route";
import { authenticateJwt } from "@/middlewares/passport";

const { API_ROUTE } = KEYS;
const router = express.Router();

// unprotected/partially-protected routes
router.use("/auth", authRouter);
router.use("/api/users", userRouter);

// protected routes
router.use(API_ROUTE, authenticateJwt());
router.use(API_ROUTE, apiRoutes);

export default router;
