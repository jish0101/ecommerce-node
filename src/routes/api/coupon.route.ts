import express from "express";
import Coupon from "@/controllers/coupon";
import { asyncWrapper } from "@/lib/helpers";
import { authenticateJwt } from "@/middlewares/passport";
import checkRoles from "@/middlewares/checkRoles";

const router = express.Router();
const controller = new Coupon();

router.get("/get", asyncWrapper(controller.get));
router.put(
  "/update",
  authenticateJwt(),
  checkRoles(["ADMIN"]),
  asyncWrapper(controller.update),
);
router.post(
  "/create",
  authenticateJwt(),
  checkRoles(["ADMIN"]),
  asyncWrapper(controller.create),
);
router.delete(
  "/delete",
  authenticateJwt(),
  checkRoles(["ADMIN"]),
  asyncWrapper(controller.delete),
);

export default router;
