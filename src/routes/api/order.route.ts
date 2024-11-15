import OrderController from "@/controllers/order/order.controller";
import checkRoles from "@/middlewares/checkRoles";
import express from "express";

const router = express.Router();
const orderController = new OrderController();

router.get("/get", orderController.get);
router.post("/create", orderController.create);
router.put("/update", orderController.update);
router.delete("/delete", checkRoles(["ADMIN"]), orderController.delete);

export default router;
