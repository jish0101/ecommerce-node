import { z } from "zod";
import { Request, Response } from "express";
import Cart from "@/models/cart/cart.model";
import { createResponse } from "@/lib/responseHelpers";
import { PayloadUserWithID } from "@/models/user/user.model";
import idSchema from "../idSchema";

const cartSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().min(1),
    }),
  ),
});

class CartController {
  async update(req: Request, res: Response) {
    const user = req.user as PayloadUserWithID;

    const { items } = cartSchema.parse(req.body);

    const cart = await Cart.findOne({ userId: user._id });

    if (cart) {
      const cart = await Cart.updateOne(
        { userId: user._id },
        { items },
        { new: true },
      );
      res.json(createResponse(200, cart, "Successfully updated item in cart"));
    } else {
      const cart = await Cart.create({ userId: user._id, items });
      res.json(createResponse(200, cart, "Successfully updated item in cart"));
    }
  }

  async delete(req: Request, res: Response) {
    const user = req.user as PayloadUserWithID;
    const { _id } = idSchema.parse(req.body);

    await Cart.findOneAndDelete({ $and: [{ _id }, { userId: user._id }] });

    res.json(createResponse(200, {}, "Successfully deleted item from cart"));
  }

  async get(req: Request, res: Response) {
    const user = req.user as PayloadUserWithID;

    const cart = await Cart.find({ userId: user._id }).populate("items.productId")

    res.json(createResponse(200, cart, "Successfully fetched cart"));
  }
}

export default CartController;
