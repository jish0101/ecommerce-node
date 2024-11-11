import express from "express";
import ProductController from "@/controllers/products/product.controller";
import { asyncWrapper } from "@/lib/helpers";
import checkAuth from "@/middlewares/checkAuth";
import checkRoles from "@/middlewares/checkRoles";

const router = express.Router();
const productController = new ProductController();

router.post(
  "/create",
  checkAuth,
  checkRoles(["ADMIN"]),
  asyncWrapper(productController.create),
);
router.put(
  "/update",
  checkAuth,
  checkRoles(["ADMIN"]),
  asyncWrapper(productController.update),
);
router.delete(
  "/delete",
  checkAuth,
  checkRoles(["ADMIN"]),
  asyncWrapper(productController.delete),
);
router.get("/get", asyncWrapper(productController.get));

export default router;
