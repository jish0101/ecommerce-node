import { asyncWrapper } from "@/lib/helpers";
import OptimisedImage from "@/services/ImageService";
import { NextFunction, Request, Response } from "express";

export const imgHandler = (dir: string, bodyKey: string) =>
  asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as Express.Multer.File[];

    if (!files) {
      req.body[bodyKey] = [];
      return next();
    }

    const imgLinks = files.map((file) => {
      return new OptimisedImage(file).getProfileImg({
        w: 500,
        h: 500,
        q: 80,
        folder: dir,
      });
    });

    const result = (await Promise.all(imgLinks)).filter((r) => r !== undefined);

    req.body[bodyKey] = result;
    next();
  });
