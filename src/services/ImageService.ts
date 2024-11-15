import path from "path";
import sharp from "sharp";
import { existsSync, mkdirSync, unlinkSync } from "fs";
import { CustomError } from "@/lib/customError";

type Config = {
  w: number;
  h: number;
  q: number;
  dir: string;
};

class OptimisedImage {
  file: Express.Multer.File | undefined;

  constructor(file?: Express.Multer.File) {
    this.file = file;
  }

  async getProfileImg({ w, h, q, dir }: Config): Promise<string> {
    const outDir = path.resolve(__dirname, "..", "public", dir);
    const fileName = `${Date.now()}.jpg`;
    const resultDir = path.join(outDir, fileName);

    if (!existsSync(outDir)) {
      mkdirSync(outDir, { recursive: true });
    }

    try {
      await sharp(this.file?.buffer)
        .resize({ width: w, height: h })
        .jpeg({ quality: q })
        .toFile(resultDir);

      return `/${dir}/${fileName}`;
    } catch (err) {
      throw new CustomError("Cannot process image", 500);
    }
  }
  deleteImageByLink(imgPath: string): void {
    const normalizedPath = imgPath.startsWith("/") ? imgPath.slice(1) : imgPath;
    const absolutePath = path.resolve(
      __dirname,
      "..",
      "public",
      normalizedPath,
    );

    try {
      if (existsSync(absolutePath)) {
        unlinkSync(absolutePath);
      }
    } catch (error) {
      throw new CustomError("Failed to delete image", 500);
    }
  }
}

export default OptimisedImage;
