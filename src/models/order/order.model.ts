import { IUser } from "../user/user.model";
import mongoose, { Document, Schema, Model } from "mongoose";

interface OrderItem {
  productId: mongoose.Schema.Types.ObjectId;
  quantity: number;
}

interface OrderDocument extends Document {
  customer: IUser | mongoose.Schema.Types.ObjectId;
  orderPrice: number;
  orderItems: OrderItem[];
  address: string;
  status: "PENDING" | "CANCELLED" | "DELIVERED";
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema<OrderItem>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new Schema<OrderDocument>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderPrice: {
      type: Number,
      required: true,
    },
    orderItems: {
      type: [orderItemSchema],
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "CANCELLED", "DELIVERED"],
      default: "PENDING",
    },
  },
  { timestamps: true },
);

const Order: Model<OrderDocument> = mongoose.model<OrderDocument>(
  "Order",
  orderSchema,
);

export { Order, OrderDocument };
