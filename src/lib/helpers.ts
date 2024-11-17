import { NextFunction, Request, Response } from "express";

type ControllerFunc = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any>;

export const asyncWrapper = (fn: ControllerFunc) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export function removeFields<T extends object, K extends keyof T>(
  obj: T,
  fieldsToRemove: K[],
): Omit<T, K> {
  const newObj = { ...obj };
  fieldsToRemove.forEach((field) => {
    delete newObj[field];
  });
  return newObj;
}
