import express from "express";
import { asyncWrapper } from "@/lib/helpers";
import checkRoles from "@/middlewares/checkRoles";
import SubCategory from "@/controllers/sub-category";

const router = express.Router();
const controller = new SubCategory();

router.post(
  "/create",
  checkRoles(["ADMIN"]),
  asyncWrapper(controller.create),
);
router.put(
  "/update",
  checkRoles(["ADMIN"]),
  asyncWrapper(controller.update),
);
router.delete(
  "/delete",
  checkRoles(["ADMIN"]),
  asyncWrapper(controller.delete),
);
router.get("/get", asyncWrapper(controller.get));

export default router;
