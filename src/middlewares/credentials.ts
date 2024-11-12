import { allowedOrigins } from "@/lib/corsOptions";
import { NextFunction, Request, Response } from "express";

export const credentials = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { origin } = req.headers;
    if (!origin || allowedOrigins.includes(origin)) {
      res.set("Access-Control-Allow-Credentials", "true");
    }
    next();
  } catch (error) {
    next(error);
  }
};
