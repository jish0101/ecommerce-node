import express from "express";
import orderRouter from "./order.route";
import productRouter from "./product.route";
import addressRouter from "./address.route";
import categoryRouter from "./category.route";
import paymentsRouter from "./payments.route";
import subCategoryRouter from "./sub-category.route";

const router = express.Router();

router.use("/order", orderRouter);
router.use("/address", addressRouter);
router.use("/products", productRouter);
router.use("/payments", paymentsRouter);
router.use("/categories", categoryRouter);
router.use("/sub-categories", subCategoryRouter);

export default router;
