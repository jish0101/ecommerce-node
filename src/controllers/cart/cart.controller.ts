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
      quantity: z.number().min(0),
    }),
  ),
});

class CartController {
  async update(req: Request, res: Response) {
    const user = req.user as PayloadUserWithID;
  
    const { items } = cartSchema.parse(req.body);
    const foundCart = await Cart.findOne({ userId: user._id });
  
    if (foundCart) {
      const newItems: typeof items = [];
      
      // Process existing cart items
      foundCart.items.forEach(item => {
        const foundItem = items.find(i => i.productId === item.productId.toString());
        if (foundItem && foundItem.quantity > 0) {
          // Update quantity for existing item
          newItems.push({ productId: item.productId.toString(), quantity: foundItem.quantity });
        } else if (!foundItem) {
          // Keep the item in the cart if not in the input but exists in the cart
          newItems.push({ productId: item.productId.toString(), quantity: item.quantity });
        }
      });
      
      // Add new items from `items` array that are not in `foundCart.items`
      items.forEach(newItem => {
        const existsInCart = foundCart.items.some(
          cartItem => cartItem.productId.toString() === newItem.productId
        );
        if (!existsInCart && newItem.quantity > 0) {
          newItems.push(newItem);
        }
      });
    
      const cart = await Cart.updateOne(
        { userId: user._id },
        { items: newItems },
        { new: true }
      );
  
      res.json(createResponse(200, cart, "Successfully updated item in cart"));
    } else {
      // Create a new cart if none exists
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
