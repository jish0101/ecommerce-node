import express from "express";
import ProductController from "@/controllers/products/product.controller";
import { asyncWrapper } from "@/lib/helpers";

const router = express.Router();
const productController = new ProductController();

router.get("/get", asyncWrapper(productController.get));
router.post("/create", asyncWrapper(productController.create));
router.put("/update", asyncWrapper(productController.update));
router.delete("/delete", asyncWrapper(productController.delete));

export default router;
