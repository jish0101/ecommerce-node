import mongoose, { Document } from "mongoose";

export type OtpAction = "EMAIL VERIFICATION" | "FORGOT PASSWORD";

export interface Otp extends Document {
  user: typeof mongoose.Schema.ObjectId;
  type: OtpAction;
  isUsed: boolean;
  value: number;
  expiresAt: number;
}

const otpSchema = new mongoose.Schema<Otp>({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["EMAIL VERIFICATION", "FORGOT PASSWORD"],
  },
  isUsed: {
    type: Boolean,
    required: true,
    default: false,
  },
  value: {
    type: Number,
    required: true,
  },
  expiresAt: {
    type: Number,
    required: true,
  },
});

export const Otp = mongoose.model<Otp>("Otp", otpSchema);
