import mongoose, { Schema, Document } from "mongoose";

interface IWishlistItem {
  productId: mongoose.Types.ObjectId;
}

export interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  items: IWishlistItem[];
  createdAt: Date;
  updatedAt: Date;
}

const WishlistItemsSchema: Schema = new mongoose.Schema({
  productId: { type: mongoose.Schema.ObjectId, ref: "Product", required: true },
});

const WishlistSchema: Schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  items: [WishlistItemsSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

WishlistSchema.pre<ICart>("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Wishlist = mongoose.model<ICart>("Wishlist", WishlistSchema);

export default Wishlist;
