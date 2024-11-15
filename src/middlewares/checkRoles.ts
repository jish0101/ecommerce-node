import { CustomError } from "@/lib/customError";
import { NextFunction, Request, Response } from "express";
import { PayloadUser, UserRoles } from "src/models/user/user.model";

const checkRoles =
  (allowedRoles: UserRoles[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as PayloadUser;

    if (user && allowedRoles.includes(user.role)) {
      return next();
    }
    return next(new CustomError("user is unauthorized", 400));
  };

export default checkRoles;
