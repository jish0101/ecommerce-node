import crypto from "crypto";
import Razorpay from "razorpay";
import { KEYS } from "@/lib/keys";
import { Request, Response } from "express";
import { CustomError } from "@/lib/customError";
import { Order } from "@/models/order/order.model";
import { createResponse } from "@/lib/responseHelpers";
import { createPaymentOrder, paymentSchema } from "./validationSchema";
import { Payments } from "@/models/payment/payment.model";
import { IUser } from "@/models/user/user.model";
import { paginationSchema } from "../paginationSchema";

const getRazorPay = () =>
  new Razorpay({
    key_id: KEYS.RAZOR_PAY_KEY_ID,
    key_secret: KEYS.RAZOR_PAY_KEY_SECRET,
  });

class PaymentsController {
  async createOrder(req: Request, res: Response) {
    const result = createPaymentOrder.parse(req.body);

    const orderDoc = await Order.findById(result.orderId).populate(
      "customer",
      "userName email",
    );

    if (!orderDoc) {
      throw new CustomError("Order not found", 404);
    }

    const options = {
      currency: "INR",
      receipt: result.orderId,
      amount: orderDoc.orderPrice * 100,
    };

    const rp = getRazorPay();

    rp.orders.create(options, async (err, rpOrder) => {
      if (err) {
        throw new CustomError(
          "Server error: failed to create payment order",
          500,
        );
      }

      const data = {
        order_id: rpOrder.id,
        amount: orderDoc.orderPrice * 100,
        key_id: KEYS.RAZOR_PAY_KEY_ID,
        contact: (orderDoc.customer as IUser).email,
        name: (orderDoc.customer as IUser).userName,
        email: (orderDoc.customer as IUser).email,
      };

      await Payments.create({
        orderId: result.orderId,
        razorpay_order_id: rpOrder.id,
        razorpay_payment_id: "",
        razorpay_signature: "",
      });

      res.json(
        createResponse(200, data, "Successfully create a payment order"),
      );
    });
  }

  async paymentVerification(req: Request, res: Response) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      paymentSchema.parse(req.body);

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", KEYS.RAZOR_PAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      throw new CustomError("Invalid Credentials", 400);
    }

    const payment = await Payments.findOne({ razorpay_order_id });

    if (!payment) {
      throw new CustomError(
        "Server error: failed to update payment status",
        500,
      );
    }

    payment.status = "paid";

    await payment.save();

    res.redirect(`${KEYS.CLIENT_BASE_URL}`);
  }

  async getPayments(req: Request, res: Response) {
    const { page, limit } = paginationSchema.parse(req.query);

    const payments = await Payments.find()
      .skip(page - 1 * limit)
      .limit(limit);

    res.json(createResponse(200, payments, "Successfully fetched payments"));
  }
}

export default PaymentsController;
