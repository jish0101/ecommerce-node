import jwt from "jsonwebtoken";
import { KEYS } from "../lib/keys";
import { NextFunction, Request, Response } from "express";
import { PayloadUser } from "../models/user/user.model";
import { asyncWrapper } from "../lib/helpers";
import { CustomError } from "@/lib/customError";

const checkAuth = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new CustomError("No auth found/invalid", 400));
    }

    const token = authHeader.split(" ")[1];
    let decoded: PayloadUser;

    try {
      decoded = jwt.verify(token, KEYS.JWT_SECRET) as PayloadUser;
    } catch (error) {
      return next(new CustomError("No auth found/invalid", 400));
    }

    req.user = decoded;
    next();
  },
);

export default checkAuth;
