import { ZodError } from "zod";
import { CustomError } from "@/lib/customError";
import { createResponse } from "@/lib/responseHelpers";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: CustomError | Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ZodError) {
    res.status(400).json(createResponse(400, err.issues, "Validation Error"));
  } else {
    const statusCode = err instanceof CustomError ? err.statusCode : 500;
    const message = err.message || "Internal Server Error";
    const details = err instanceof CustomError && err.details;
    const data = err instanceof CustomError && err.data;
    res
      .status(statusCode)
      .json(createResponse(statusCode, data, message, details));
  }
};
