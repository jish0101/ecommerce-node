import express from "express";
import userRouter from "./user.route";
import authRouter from "./auth.route";
import orderRouter from "./order.route";
import productRouter from "./product.route";
import addressRouter from "./address.route";
import categoryRouter from "./category.route";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/order", orderRouter);
router.use("/address", addressRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);

export default router;
