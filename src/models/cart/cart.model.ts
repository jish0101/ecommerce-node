import mongoose, { Schema, Document } from "mongoose";

interface ICartItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

export interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  items: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}

const CartItemSchema: Schema = new mongoose.Schema({
  productId: { type: mongoose.Schema.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 },
});

const CartSchema: Schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  items: [CartItemSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

CartSchema.pre<ICart>("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Cart = mongoose.model<ICart>("Cart", CartSchema);

export default Cart;
