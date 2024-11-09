import jwt from "jsonwebtoken";
import { KEYS } from "../lib/keys";
import { NextFunction, Request, Response } from "express";
import { PayloadUser } from "../models/user/user.model";
import { asyncWrapper } from "../lib/helpers";

const checkAuth = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new Error("No auth header/token found"));
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, KEYS.JWT_SECRET) as PayloadUser;

    req.user = decoded;
    next();
  },
);

export default checkAuth;
