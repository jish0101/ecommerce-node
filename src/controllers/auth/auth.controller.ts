import jwt from "jsonwebtoken";
import { KEYS } from "@/lib/keys";
import { Request, Response } from "express";
import {
  authSchema,
  sendOtpSchema,
  verifyUserSchema,
} from "./validationSchema";
import { PayloadUserWithID, User } from "@/models/user/user.model";
import { CustomError } from "@/lib/customError";
import { createResponse } from "@/lib/responseHelpers";
import OtpService from "@/services/otpService";
import Mailer from "@/services/emailService";
import { removeFields } from "@/lib/helpers";
import { Otp } from "@/models/otp/Otp";
import TokenService from "@/services/tokenService";

class AuthController {
  async login(req: Request, res: Response) {
    const result = authSchema.parse(req.body);

    const user = await User.findOne({ email: result.email });

    if (!user) {
      throw new CustomError("Credentials are not valid", 400);
    }

    const { email, userName, _id, isVerified, role, profileImage } = user;
    const payloadUser: PayloadUserWithID & { accessToken?: string } = {
      _id: String(_id),
      email,
      isVerified,
      role,
      userName,
      profileImage,
    };

    const tokens = new TokenService();

    const accessToken = tokens.getToken(payloadUser, "access");
    const refreshToken = tokens.getToken(payloadUser, "refresh");

    user.refreshToken = refreshToken;

    await user.save();

    payloadUser.accessToken = accessToken;

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      path: "/",
    });
    res.json(createResponse(200, payloadUser, "Successfully logged-in user"));
  }

  async logout(req: Request, res: Response) {
    const cookies = req.cookies;

    if (!cookies.refresh_token) {
      return res.json(
        createResponse(200, null, "Successfully logged-out user"),
      );
    }

    res.clearCookie("refresh_token", {
      httpOnly: true,
      path: "/",
    });

    res.json(createResponse(200, null, "Successfully logged-out user"));
  }

  async refreshToken(req: Request, res: Response) {
    const cookies = req.cookies;

    if (!cookies || !cookies.refresh_token) {
      throw new CustomError("Credentials are not valid", 400);
    }

    const tokens = new TokenService();

    const isOk = tokens.verifyToken(cookies.refresh_token);

    if (!isOk) {
      throw new CustomError("Credentials are not valid", 400);
    }

    const { _id, email, isVerified, role, userName, profileImage } = isOk;

    const accessToken = tokens.getToken(
      { _id, email, isVerified, role, userName, profileImage },
      "access",
    );

    res.json(
      createResponse(
        200,
        { ...isOk, accessToken },
        "Successfully updated auth",
      ),
    );
  }

  async verifyUser(req: Request, res: Response) {
    const { _id, userId, value, type } = verifyUserSchema.parse(req.body);

    const otpService = new OtpService();

    const result = await otpService.verifyOtp({ _id, userId, value, type });

    if (result) {
      const updatedUser = await User.findByIdAndUpdate(userId, {
        isVerified: true,
      });

      if (!updatedUser) {
        throw new CustomError("Server error: failed to verify user", 500);
      }
    }

    return res.json(createResponse(200, result, "Successfully verified user"));
  }

  async resetPassword(req: Request, res: Response) {
    const { _id, userId, value, type, password } = verifyUserSchema.parse(
      req.body,
    );

    if (type !== "FORGOT PASSWORD") {
      throw new CustomError(`Otp type is invalid: ${type}`, 400);
    }

    if (!password) {
      throw new CustomError(`Password is required`, 400);
    }

    const otp = await Otp.findOne({ _id, isUsed: false });

    if (!otp) {
      throw new CustomError(`Otp not found`, 404);
    }

    if (value !== otp.value) {
      throw new CustomError(`Otp is not valid`, 400);
    }

    otp.isUsed = true;

    await otp.save();

    const updatedUser = await User.findByIdAndUpdate(userId, { password });

    if (!updatedUser) {
      throw new CustomError("Server Error: failed to reset password", 500);
    }

    return res.json(
      createResponse(200, null, "Successfully updated user password"),
    );
  }

  async sendOtp(req: Request, res: Response) {
    const { email, type } = sendOtpSchema.parse(req.body);

    const otpService = new OtpService();

    const user = await User.findOne({ email });

    if (!user) {
      throw new CustomError("User not found", 404);
    }

    const createdOtp = await otpService.createOtp({
      userId: user._id as string,
      type,
    });

    const mailer = new Mailer();

    await mailer.sendConfirmationOtp({
      email,
      otpVal: createdOtp.value,
      userName: user.userName,
      type,
    });

    return res.json(
      createResponse(
        200,
        {
          otp: removeFields(createdOtp, ["value", "expiresAt", "isUsed"]),
        },
        `Successfully sent an otp to ${email}`,
      ),
    );
  }
}

export default AuthController;
