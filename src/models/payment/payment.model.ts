import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  status: {
    type: String,
    enum: ["due", "paid", "returned"],
    default: "due",
  },
  razorpay_order_id: {
    type: String,
    default: "",
  },
  razorpay_payment_id: {
    type: String,
    default: "",
  },
  razorpay_signature: {
    type: String,
    default: "",
  },
});

export const Payments = mongoose.model("Payments", paymentSchema);
