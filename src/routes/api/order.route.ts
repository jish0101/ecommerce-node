import OrderController from "@/controllers/order/order.controller";
import { asyncWrapper } from "@/lib/helpers";
import checkRoles from "@/middlewares/checkRoles";
import express from "express";

const router = express.Router();
const orderController = new OrderController();

router.get("/get", asyncWrapper(orderController.get));
router.post("/create", asyncWrapper(orderController.create));
router.put("/update", asyncWrapper(orderController.update));
router.delete(
  "/delete",
  checkRoles(["ADMIN"]),
  asyncWrapper(orderController.delete),
);

export default router;
