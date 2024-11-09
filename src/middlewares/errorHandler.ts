import { Request, Response, NextFunction } from "express";
import { CustomError } from "@/lib/customError";
import { createResponse } from "@/lib/responseHelpers";

export const errorHandler = (
  err: CustomError | Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err instanceof CustomError ? err.statusCode : 500;
  const message = err.message || "Internal Server Error";
  const details =
    err instanceof CustomError && err.details ? err.details : null;

  res
    .status(statusCode)
    .json(createResponse(statusCode, null, message, details));
};
