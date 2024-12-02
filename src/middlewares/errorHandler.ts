import { Request, Response, NextFunction } from "express";
import { CustomError } from "@/lib/customError";
import { createResponse } from "@/lib/responseHelpers";
import { ZodError } from "zod";

export const errorHandler = (
  err: CustomError | Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ZodError) {
    return res
      .status(400)
      .json(createResponse(400, err.issues, "Validation Error"));
  }

  const statusCode = err instanceof CustomError ? err.statusCode : 500;
  const message = err.message || "Internal Server Error";
  const details = err instanceof CustomError && err.details ? err.details : null;
  const data = err instanceof CustomError && err.data ? err.data : null;

  res
    .status(statusCode)
    .json(createResponse(statusCode, data, message, details));
};
