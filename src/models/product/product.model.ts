import mongoose, { Document, Schema, Model } from "mongoose";

export interface IProduct extends Document {
  name: string;
  desc: string;
  category: mongoose.Types.ObjectId;
  categoryName: string;
  subCategory: mongoose.Types.ObjectId;
  subCategoryName: string;
  price: number;
  offerPriceDiscount: number;
  stock: number;
  imageLinks: string[];
  isFeatured: boolean;
  updatedBy: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    desc: {
      type: String,
      required: true,
      lowercase: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
    },
    subCategory: {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    subCategoryName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    offerPriceDiscount: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    imageLinks: {
      type: [String],
      default: [],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

productSchema.index({
  name: "text",
  "category.name": "text",
  "subCategory.name": "text",
});

export const Product: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  productSchema,
);
