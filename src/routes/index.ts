import express from "express";
import { KEYS } from "../lib/keys";
import apiRoutes from "./api/routes";
import authRouter from "./api/auth.route";
import { authenticateJwt } from "@/middlewares/passport";

const { API_ROUTE } = KEYS;
const router = express.Router();

router.use("/auth", authRouter);

router.use(API_ROUTE, authenticateJwt());
router.use(API_ROUTE, apiRoutes);

export default router;
