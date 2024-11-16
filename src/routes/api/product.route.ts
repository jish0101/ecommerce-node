import express from "express";
import ProductController from "@/controllers/products/product.controller";
import { asyncWrapper } from "@/lib/helpers";
import checkRoles from "@/middlewares/checkRoles";
import multerInstance from "@/lib/multer";
import { imgHandler } from "@/middlewares/imageHandler";
import validator from "@/middlewares/zodValidator";
import { createProductSchema } from "@/controllers/products/productSchema";
import idSchema from "@/controllers/idSchema";

const router = express.Router();
const productController = new ProductController();

router.post(
  "/create",
  checkRoles(["ADMIN"]),
  multerInstance.array("productImages", 4),
  validator(createProductSchema, "body"),
  imgHandler("products", "imageLinks"),
  asyncWrapper(productController.create),
);
router.put(
  "/update",
  checkRoles(["ADMIN"]),
  multerInstance.array("productImages", 4),
  validator(createProductSchema.merge(idSchema), "body"),
  imgHandler("products", "imageLinks"),
  asyncWrapper(productController.update),
);
router.delete(
  "/delete",
  checkRoles(["ADMIN"]),
  asyncWrapper(productController.delete),
);
router.get("/get", asyncWrapper(productController.get));

export default router;
