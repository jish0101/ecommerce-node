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
