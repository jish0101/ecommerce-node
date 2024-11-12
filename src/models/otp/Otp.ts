import mongoose, { Document } from "mongoose";

type OtpAction = "EMAIL VERIFICATION" | "FORGOT PASSWORD";

export interface Otp extends Document {
  type: OtpAction;
  isUsed: boolean;
  value: number;
}

const otpSchema = new mongoose.Schema<Otp>({
  type: {
    type: String,
    required: true,
    enum: ["EMAIL VERIFICATION", "FORGOT PASSWORD"],
  },
  isUsed: {
    required: true,
    type: Boolean,
  },
  value: {
    required: true,
    type: Number,
  },
});

export const Otp = mongoose.model<Otp>("Otp", otpSchema);
