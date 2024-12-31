import express from "express";
import cartRouter from "./cart.route";
import orderRouter from "./order.route";
import addressRouter from "./address.route";
import paymentsRouter from "./payments.route";

const router = express.Router();

router.use('/cart', cartRouter);
router.use("/order", orderRouter);
router.use("/address", addressRouter);
router.use("/payments", paymentsRouter);

export default router;
