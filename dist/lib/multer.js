"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const customError_1 = require("./customError");
const storage = multer_1.default.memoryStorage();
const multerInstance = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 7 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new customError_1.CustomError("Invalid file type. Only JPEG, PNG, and GIF are allowed.", 400));
        }
    },
});
exports.default = multerInstance;
//# sourceMappingURL=multer.js.map