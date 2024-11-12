import express from "express";
import ProductController from "@/controllers/products/product.controller";
import { asyncWrapper } from "@/lib/helpers";
import checkRoles from "@/middlewares/checkRoles";

const router = express.Router();
const productController = new ProductController();

router.post(
  "/create",
  checkRoles(["ADMIN"]),
  asyncWrapper(productController.create),
);
router.put(
  "/update",
  checkRoles(["ADMIN"]),
  asyncWrapper(productController.update),
);
router.delete(
  "/delete",
  checkRoles(["ADMIN"]),
  asyncWrapper(productController.delete),
);
router.get("/get", asyncWrapper(productController.get));

export default router;
