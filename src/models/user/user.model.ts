import mongoose, { Document } from "mongoose";

export type UserRoles = "ADMIN" | "USER";

export interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  isVerified: boolean;
  refreshToken?: string;
  role: UserRoles;
}

export type PayloadUser = Pick<
  IUser,
  "userName" | "email" | "isVerified" | "role"
>;

const userSchema = new mongoose.Schema<IUser>(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);

export const User = mongoose.model<IUser>("User", userSchema);
