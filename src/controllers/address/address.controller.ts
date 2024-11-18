import idSchema from "../idSchema";
import { Request, Response } from "express";
import { createResponse } from "@/lib/responseHelpers";
import { Address } from "@/models/address/address.model";
import { createAddressSchema } from "./validationSchema";
import { PayloadUser, PayloadUserWithID } from "@/models/user/user.model";
import { CustomError } from "@/lib/customError";
import { paginationSchema } from "../paginationSchema";

class AddressController {
  async get(req: Request, res: Response) {
    const { page, limit } = paginationSchema.parse(req.query);

    const data = await Address.find()
      .skip(page - 1 * limit)
      .limit(limit);

    res.json(createResponse(200, data, "Successfully fetched addresses"));
  }
  async create(req: Request, res: Response) {
    const payload = createAddressSchema.parse(req.body);
    const user = req.user as PayloadUser & { _id: string };

    if (payload.isPrimary === true) {
      await Address.findOneAndUpdate({ isPrimary: true }, { isPrimary: false });
    }

    const createdAddress = await Address.create({
      pinCode: payload.pinCode,
      country: payload.country,
      state: payload.state,
      city: payload.city,
      street: payload.street,
      isPrimary: payload.isPrimary,
      user: user._id,
    });

    res.json(
      createResponse(200, createdAddress, "Successfully created user address"),
    );
  }
  async update(req: Request, res: Response) {
    const user = req.user as PayloadUserWithID;
    const payload = createAddressSchema.merge(idSchema).parse(req.body);

    if (payload.isPrimary === true) {
      await Address.findOneAndUpdate(
        { user: user._id, isPrimary: true },
        { isPrimary: false },
      );
    }

    const updatedAddress = await Address.findOneAndUpdate(
      {
        $and: [{ user: user._id }, { _id: payload._id }],
      },
      {
        pinCode: payload.pinCode,
        country: payload.country,
        state: payload.state,
        city: payload.city,
        street: payload.street,
        isPrimary: payload.isPrimary,
        user: user._id,
      },
      { new: true },
    ).lean();

    res.json(
      createResponse(200, updatedAddress, "Successfully updated user address"),
    );
  }
  async delete(req: Request, res: Response) {
    const payload = idSchema.parse(req.query);
    const user = req.user as PayloadUser & { _id: string };

    if (!user || !user._id) {
      throw new CustomError("User not found", 400);
    }

    const deletedAddress = await Address.findOneAndDelete(
      {
        $and: [{ user: user._id }, { _id: payload._id }, { isPrimary: false }],
      },
      { new: true },
    ).lean();

    if (!deletedAddress) {
      throw new CustomError("Non primary address not found", 404);
    }

    res.json(
      createResponse(200, deletedAddress, "Successfully deleted address"),
    );
  }
}

export default AddressController;
