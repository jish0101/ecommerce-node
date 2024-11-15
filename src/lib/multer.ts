import multer from "multer";
import { CustomError } from "./customError";

const storage = multer.memoryStorage();

const multerInstance = multer({
  storage,
  limits: {
    fileSize: 7 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new CustomError(
          "Invalid file type. Only JPEG, PNG, and GIF are allowed.",
          400,
        ),
      );
    }
  },
});

export default multerInstance;
