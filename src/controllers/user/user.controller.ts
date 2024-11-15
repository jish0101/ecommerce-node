import { Request, Response } from "express";
import { createResponse } from "../../lib/responseHelpers";
import { createUserSchema, updateUserSchema } from "./validationSchema";
import { PayloadUser, User } from "@/models/user/user.model";
import { CustomError } from "@/lib/customError";
import idSchema from "../idSchema";
import { Otp } from "@/models/otp/Otp";
import OptimisedImage from "@/services/ImageService";

class UserController {
  async get(req: Request, res: Response) {
    const users = await User.find();

    res.json(createResponse(200, users, "Successfully fetched users"));
  }
  async create(req: Request, res: Response) {
    const result = createUserSchema.parse(req.body);

    const isAlreadyExisting = await User.findOne({
      $or: [{ email: result.email }, { userName: result.userName }],
    });

    if (isAlreadyExisting) {
      throw new CustomError(
        "User with this email/username already exists",
        400,
      );
    }

    const { userName, email, isVerified, role, _id } = await User.create({
      ...result,
    });

    res.json(
      createResponse(
        200,
        { userName, email, isVerified, role, _id },
        "Successfully created user",
      ),
    );
  }
  async update(req: Request, res: Response) {
    const body = updateUserSchema.parse(req.body);

    const user = await User.findById(body._id);

    if (!user) {
      throw new CustomError("User not found", 404);
    }

    // user is adding new email
    if (user.email !== body.email) {
      const otp = await Otp.findById(body.otp_id);

      if (!otp || otp.value !== body.otp_value || otp.isUsed === false) {
        throw new CustomError("Otp not found/invalid otp", 400);
      }
      otp.isUsed = true;

      await otp.save();
    }

    const updatedUser = await User.findByIdAndUpdate(body._id, {
      userName: body.userName,
      email: body.email,
    });

    if (!updatedUser) {
      throw new CustomError("Server error", 500);
    }

    const { password, ...data } = updatedUser;

    res.json(createResponse(200, data, "Successfully updated user"));
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

    const deletedUser = await User.findByIdAndDelete(id);

    return res.json(
      createResponse(200, deletedUser, "Successfully deleted user"),
    );
  }
}

export default UserController;
