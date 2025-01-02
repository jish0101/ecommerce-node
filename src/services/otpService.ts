import { CustomError } from "@/lib/customError";
import { Otp, OtpAction } from "@/models/otp/Otp";
import crypto from "crypto";

type SendOtpOptions = {
  userId: string;
  type: OtpAction;
};

type VerifyOtpOptions = SendOtpOptions & { _id: string; value: number };

class OtpService {
  async createOtp({ userId, type }: SendOtpOptions) {
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000;

    const createdOtp = await Otp.create({
      user: userId,
      type,
      value: parseInt(otp, 10),
      expiresAt,
    });

    return createdOtp.toObject();
  }
  async verifyOtp({ userId, type, _id, value }: VerifyOtpOptions) {
    const result = await Otp.findOne({
      _id,
      user: userId,
      type,
      isUsed: false,
    }).lean();

    if (!result) {
      throw new CustomError("Otp not found", 404);
    }

    if (result.value !== value || Date.now() > result.expiresAt) {
      throw new CustomError("Otp is not valid/expired", 400);
    }

    const updated = await Otp.findByIdAndUpdate(_id, { isUsed: true }).lean();

    if (!updated) {
      throw new CustomError("Server error: failed to update otp status", 500);
    }

    return true;
  }
}

export default OtpService;
