import { z } from "zod";
import Wishlist from "@/models/wishlist";
import { Request, Response } from "express";
import { createResponse } from "@/lib/responseHelpers";
import { PayloadUserWithID } from "@/models/user/user.model";

const schema = z.object({
  flag: z.enum(["U", "D"]),
  items: z.array(
    z.object({
      productId: z.string(),
    }),
  ),
});

class WishlistController {
  async update(req: Request, res: Response) {
    const user = req.user as PayloadUserWithID;

    const { items, flag } = schema.parse(req.body);
    const foundList = await Wishlist.findOne({ userId: user._id });

    // if no list exists, create a new one
    if (!foundList) {
      const cart = await Wishlist.create({ userId: user._id, items });
      return res.json(
        createResponse(200, cart, "Successfully updated item in wishlist"),
      );
    }

    // if flag is delete, remove item from list
    if (flag === "D") {
      const hasItem = foundList.items.findIndex(
        (item) => item.productId.toString() !== items[0].productId,
      );

      if (hasItem === -1) {
        return res.json(
          createResponse(200, foundList, "Item does not exist in wishlist"),
        );
      }
      const list = await Wishlist.updateOne(
        { userId: user._id },
        { items: foundList.items.splice(hasItem, 1) },
        { new: true },
      );
      return res.json(
        createResponse(200, list, "Successfully updated item in wishlist"),
      );
    }

    // if flag is update, add item in list
    if (flag === "U") {
      const existsInList = foundList.items.findIndex(
        (item) => item.productId.toString() === items[0].productId,
      );

      if (existsInList === -1) {
        const newItems = [...foundList.items, items[0]];
        const list = await Wishlist.updateOne(
          { userId: user._id },
          { items: newItems },
          { new: true },
        );
        return res.json(
          createResponse(200, list, "Successfully updated item in wishlist"),
        );
      } else {
        return res.json(
          createResponse(200, foundList, "Item already exists in wishlist"),
        );
      }
    }
  }

  async get(req: Request, res: Response) {
    const user = req.user as PayloadUserWithID;

    const list = await Wishlist.find({ userId: user._id }).populate(
      "items.productId",
    );

    res.json(createResponse(200, list, "Successfully fetched wishlist"));
  }
}

export default WishlistController;
