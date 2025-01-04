import { getNextDayDate } from "@/lib/dates";
import mongoose, { Document, Model } from "mongoose";

export interface ICoupon {
  name: string;
  expiry: Date;
  discountPercent: number;
  maxDiscount: number;
  minOrderValue: number;
}

export interface ICouponDocument extends ICoupon, Document {}

const couponSchema = new mongoose.Schema<ICouponDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    expiry: {
      type: Date,
      required: true,
      default: () => getNextDayDate(1),
    },
    discountPercent: {
      type: Number,
      required: true,
    },
    maxDiscount: {
      type: Number,
      required: true,
    },
    minOrderValue: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export const Coupon: Model<ICouponDocument> = mongoose.model<ICouponDocument>(
  "Coupon",
  couponSchema,
);
