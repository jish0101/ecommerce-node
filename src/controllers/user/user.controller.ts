import { Request, Response } from "express";
import { createResponse } from "../../lib/responseHelpers";
import { createUserSchema, updateUserSchema } from "./validationSchema";
import { PayloadUser, PayloadUserWithID, User } from "@/models/user/user.model";
import { CustomError } from "@/lib/customError";
import idSchema from "../idSchema";
import OptimisedImage from "@/services/ImageService";
import OtpService from "@/services/otpService";
import Mailer from "@/services/emailService";
import { removeFields } from "@/lib/helpers";
import { paginationSchema } from "../paginationSchema";

class UserController {
  async get(req: Request, res: Response) {
    const { page, limit } = paginationSchema.parse(req.query);

    const users = await User.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .select("-password -__v -refreshToken")
      .lean();

    res.json(createResponse(200, users, "Successfully fetched users"));
  }
  async create(req: Request, res: Response) {
    const result = createUserSchema.parse(req.body);

    const isAlreadyExisting = await User.findOne({
      $or: [{ email: result.email }],
    });

    if (isAlreadyExisting) {
      throw new CustomError(
        "User with this email/username already exists",
        400,
      );
    }

    const otpService = new OtpService();
    const user = await User.create({
      fullName: `${result.firstName} ${result.lastName}`,
      email: result.email,
      password: result.password,
    });

    if (!user) {
      throw new CustomError("Failed to create user", 500);
    }

    const { fullName, email, isVerified, role, _id } = user;
    const createdOtp = await otpService.createOtp({
      type: "EMAIL VERIFICATION",
      userId: _id as string,
    });

    const mailer = new Mailer();

    const emailSent = await mailer.sendConfirmationOtp({
      email,
      userName: fullName,
      type: createdOtp.type,
      otpVal: createdOtp.value,
    });

    if (!emailSent) {
      throw new CustomError("Failed to send otp", 500)
    }

    res.json(
      createResponse(
        200,
        { fullName, email, isVerified, role, _id },
        "Successfully created user",
        { otp: removeFields(createdOtp, ["value", "expiresAt", "isUsed"]) },
      ),
    );
  }
  async update(req: Request, res: Response) {
    const payloadUser = req.user as PayloadUserWithID;
    const body = updateUserSchema.parse(req.body);

    const user = await User.findById(payloadUser._id);

    if (!user) {
      throw new CustomError("User not found", 404);
    }

    // user is adding new email
    if (user.email !== body.email) {
      if (!body.otp_id || !body.otp_value) {
        throw new CustomError(
          "Email cannot be changed without otp_id, otp_value",
          400,
        );
      }

      // check if anothe user has same email if yes return
      const existingUser = await User.findOne({ email: body.email });

      if (existingUser) {
        throw new CustomError(
          "Email cannot be changed, duplicate user found.",
          400,
        );
      }

      const otpService = new OtpService();

      await otpService.verifyOtp({
        _id: body.otp_id,
        value: body.otp_value,
        type: "EMAIL VERIFICATION",
        userId: user._id as string,
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      payloadUser._id,
      {
        userName: body.userName,
        email: body.email,
      },
      { new: true },
    )
      .select("-__v -refreshToken -password")
      .lean();

    if (!updatedUser) {
      throw new CustomError("Server error", 500);
    }

    res.json(createResponse(200, updatedUser, "Successfully updated user"));
  }
  async updateProfile(req: Request, res: Response) {
    if (!req.file) {
      throw new CustomError("image file is missing", 400);
    }

    const user = req.user as PayloadUser & { _id: string };

    if (!user) {
      throw new CustomError("user is missing", 404);
    }

    const foundUser = await User.findById(user._id);

    if (!foundUser) {
      throw new CustomError("user not found", 404);
    }

    const opm = new OptimisedImage(req.file);

    if (foundUser.profileImage) {
      opm.deleteImageByLink(foundUser.profileImage);
    }

    const image = await opm.getProfileImg({
      w: 400,
      h: 400,
      q: 80,
      dir: foundUser.email,
    });

    foundUser.profileImage = image;

    await foundUser.save();

    res.json(createResponse(200, image, "Successfully uploaded profile"));
  }
  async delete(req: Request, res: Response) {
    const id = idSchema.parse(req.query);

    const deletedUser = await User.findByIdAndDelete(id)
      .select("-password -__v")
      .lean();

    return res.json(
      createResponse(200, deletedUser, "Successfully deleted user"),
    );
  }
}

export default UserController;
