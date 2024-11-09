import { NextFunction, Request, Response } from "express";
import { UserRoles } from "src/models/user/user.model";

const checkRoles =
  (allowedRoles: UserRoles[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (req.user && allowedRoles.includes(req.user.role)) {
      return next();
    }
    return next(new Error("Unauthorized"));
  };

export default checkRoles;
