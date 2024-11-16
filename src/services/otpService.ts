import { CustomError } from "@/lib/customError";
import { Otp, OtpAction } from "@/models/otp/Otp";
import crypto from "crypto";

type SendOtpOptions = {
  userId: string;
  email: string;
  type: OtpAction;
};

type VerifyOtpOptions = Omit<
  SendOtpOptions & { _id: string; value: number },
  "email"
>;

class OtpService {
  async sendOtp({ userId, email, type }: SendOtpOptions) {
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = Date.now() * 5 * 60 * 1000;

    const createdOtp = await Otp.create({
      user: userId,
      type: type,
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
      throw new CustomError("Otp is not valid/expired", 404);
    }

    return true;
  }
}

export default OtpService;