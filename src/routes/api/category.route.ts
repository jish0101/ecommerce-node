import Category from "@/controllers/category/category.controller";
import { asyncWrapper } from "@/lib/helpers";
import checkRoles from "@/middlewares/checkRoles";
import { authenticateJwt } from "@/middlewares/passport";
import express from "express";

const router = express.Router();
const categoryController = new Category();

router.post(
  "/create",
  authenticateJwt(),
  checkRoles(["ADMIN"]),
  asyncWrapper(categoryController.create),
);
router.put(
  "/update",
  authenticateJwt(),
  checkRoles(["ADMIN"]),
  asyncWrapper(categoryController.update),
);
router.delete(
  "/delete",
  authenticateJwt(),
  checkRoles(["ADMIN"]),
  asyncWrapper(categoryController.delete),
);
router.get("/get", asyncWrapper(categoryController.get));

export default router;
