import { Request, Response } from "express";
import { createResponse } from "../../lib/responseHelpers";
import { createUserSchema } from "./validationSchema";
import { User } from "@/models/user/user.model";
import { CustomError } from "@/lib/customError";
import idSchema from "../idSchema";

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

    const user = await User.create({ ...result });
    res.json(createResponse(200, user, "Successfully created user"));
  }
  async update(req: Request, res: Response) {
    const { password, ...rest } = createUserSchema
      .merge(idSchema)
      .parse(req.body);

    const updatedUser = await User.findByIdAndUpdate(rest._id, rest);

    res.json(createResponse(200, updatedUser, "Successfully updated user"));
  }
  async delete(req: Request, res: Response) {
    const id = idSchema.parse(req.body);

    const deletedUser = await User.findByIdAndDelete(id);

    return res.json(
      createResponse(200, deletedUser, "Successfully deleted user"),
    );
  }
}

export default UserController;
