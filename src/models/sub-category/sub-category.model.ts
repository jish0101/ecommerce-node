import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: true,
    }
  },
  { timestamps: true },
);

export const SubCategory = mongoose.model("SubCategory", subCategorySchema);
