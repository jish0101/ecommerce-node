"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = require("fs");
const customError_1 = require("../lib/customError");
class OptimisedImage {
    constructor(file) {
        this.file = file;
    }
    getProfileImg(_a) {
        return __awaiter(this, arguments, void 0, function* ({ w, h, q, dir }) {
            var _b;
            const outDir = path_1.default.resolve(__dirname, "..", "public", dir);
            const fileName = `${Date.now()}.jpg`;
            const resultDir = path_1.default.join(outDir, fileName);
            if (!(0, fs_1.existsSync)(outDir)) {
                (0, fs_1.mkdirSync)(outDir, { recursive: true });
            }
            try {
                yield (0, sharp_1.default)((_b = this.file) === null || _b === void 0 ? void 0 : _b.buffer)
                    .resize({ width: w, height: h })
                    .jpeg({ quality: q })
                    .toFile(resultDir);
                return `/${dir}/${fileName}`;
            }
            catch (err) {
                throw new customError_1.CustomError("Cannot process image", 500);
            }
        });
    }
    deleteImageByLink(imgPath) {
        const normalizedPath = imgPath.startsWith("/") ? imgPath.slice(1) : imgPath;
        const absolutePath = path_1.default.resolve(__dirname, "..", "public", normalizedPath);
        try {
            if ((0, fs_1.existsSync)(absolutePath)) {
                (0, fs_1.unlinkSync)(absolutePath);
            }
        }
        catch (error) {
            throw new customError_1.CustomError("Failed to delete image", 500);
        }
    }
}
exports.default = OptimisedImage;
//# sourceMappingURL=ImageService.js.map