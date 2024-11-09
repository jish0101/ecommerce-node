import mongoose from "mongoose";

const addSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    isPrimary: {
      type: Boolean,
      required: true,
      default: false,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true,
      lowercase: true,
    },
    state: {
      type: String,
      required: true,
      lowercase: true,
    },
    city: {
      type: String,
      required: true,
      lowercase: true,
    },
    street: {
      type: String,
      required: true,
      lowercase: true,
    },
  },
  { timestamps: true },
);

export const Address = mongoose.model("Address", addSchema);
