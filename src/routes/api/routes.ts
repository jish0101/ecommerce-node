import express from "express";
import userRouter from "./user.route";
import productRouter from "./product.route";
import authRouter from "./auth.route";

const router = express.Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/products", productRouter);

export default router;
