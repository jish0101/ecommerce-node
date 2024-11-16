import { asyncWrapper } from "@/lib/helpers";
import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

const validator = (schema: ZodSchema, dataKey: "body" | "query") => {
  return asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
      schema.parse(req[dataKey]);
      next();
    },
  );
};

export default validator;
