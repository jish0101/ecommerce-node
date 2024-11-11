import Category from "@/controllers/category/category.controller";
import { asyncWrapper } from "@/lib/helpers";
import checkAuth from "@/middlewares/checkAuth";
import checkRoles from "@/middlewares/checkRoles";
import express from "express";

const router = express.Router();
const categoryController = new Category();

router.post(
  "/create",
  checkAuth,
  checkRoles(["ADMIN"]),
  asyncWrapper(categoryController.create),
);
router.put(
  "/update",
  checkAuth,
  checkRoles(["ADMIN"]),
  asyncWrapper(categoryController.update),
);
router.delete(
  "/delete",
  checkAuth,
  checkRoles(["ADMIN"]),
  asyncWrapper(categoryController.delete),
);
router.get("/get", asyncWrapper(categoryController.get));

export default router;
