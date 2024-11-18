import PaymentsController from "@/controllers/payments/payments.controller";
import { asyncWrapper } from "@/lib/helpers";
import express from "express";

const router = express.Router();
const paymentsController = new PaymentsController();

router.get("/get", asyncWrapper(paymentsController.getPayments));
router.post("/initiate-order", asyncWrapper(paymentsController.createOrder));

router.post(
  "/paymentVerification",
  asyncWrapper(paymentsController.paymentVerification),
);

export default router;
