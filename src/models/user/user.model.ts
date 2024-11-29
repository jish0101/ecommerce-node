import mongoose, { Document } from "mongoose";

export type UserType = "jwt" | "google";
export type UserRoles = "ADMIN" | "USER";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  isVerified: boolean;
  refreshToken?: string;
  profileImage?: string;
  role: UserRoles;
  userType: UserType;
}

export type PayloadUser = Pick<
  IUser,
  "fullName" | "email" | "isVerified" | "role" | "profileImage" | "userType"
>;

export type PayloadUserWithID = PayloadUser & { _id: string };

const userSchema = new mongoose.Schema<IUser>(
  {
    fullName: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
    refreshToken: {
      type: String,
      required: false,
    },
    profileImage: {
      type: String,
      required: false,
    },
    userType: {
      type: String,
      enum: ["jwt", "google"],
      default: "jwt",
    },
  },
  { timestamps: true },
);

export const User = mongoose.model<IUser>("User", userSchema);
