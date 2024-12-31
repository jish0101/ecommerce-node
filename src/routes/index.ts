import express from "express";
import { KEYS } from "../lib/keys";
import apiRoutes from "./api/routes";
import authRouter from "./api/auth.route";
import userRouter from "./api/user.route";
import productRouter from "./api/product.route";
import categoryRouter from "./api/category.route";
import subCategoryRouter from "./api/sub-category.route";
import { authenticateJwt } from "@/middlewares/passport";

const { API_ROUTE } = KEYS;
const router = express.Router();

// unprotected/partially-protected routes
router.use("/auth", authRouter);
router.use(`${API_ROUTE}/users`, userRouter);
router.use(`${API_ROUTE}/products`, productRouter);
router.use(`${API_ROUTE}/categories`, categoryRouter);
router.use(`${API_ROUTE}/sub-categories`, subCategoryRouter);

// protected routes
router.use(API_ROUTE, authenticateJwt());
router.use(API_ROUTE, apiRoutes);

export default router;
