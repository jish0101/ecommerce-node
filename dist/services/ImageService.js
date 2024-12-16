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
Object.defineProperty(exports, "__esModule", { value: true });
const keys_1 = require("../lib/keys");
const cloudinary_1 = require("cloudinary");
const customError_1 = require("../lib/customError");
cloudinary_1.v2.config({
    cloud_name: keys_1.KEYS.CLOUDINARY_NAME,
    api_key: keys_1.KEYS.CLOUDINARY_API_KEY,
    api_secret: keys_1.KEYS.CLOUDINARY_API_SECRET,
});
class OptimisedImage {
    constructor(file) {
        this.file = file;
    }
    getProfileImg(_a) {
        return __awaiter(this, arguments, void 0, function* ({ w, h, q, folder }) {
            try {
                if (!this.file || !this.file.buffer) {
                    throw new customError_1.CustomError('No file provided', 400);
                }
                const uploadResult = yield new Promise((resolve, reject) => {
                    var _a;
                    const uploadStream = cloudinary_1.v2.uploader.upload_stream({
                        folder,
                        transformation: [{ width: w, height: h, quality: q, crop: 'fill' }],
                    }, (error, result) => {
                        if (error)
                            return reject(error);
                        resolve(result);
                    });
                    if ((_a = this.file) === null || _a === void 0 ? void 0 : _a.buffer) {
                        uploadStream.end(this.file.buffer);
                    }
                });
                if (!uploadResult.secure_url) {
                    throw new customError_1.CustomError('Failed to process image', 500);
                }
                return uploadResult.secure_url;
            }
            catch (error) {
                console.error('Error processing image:', error);
            }
        });
    }
    deleteImageByLink(secureUrl, folder) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const urlParts = secureUrl.split('/');
                const fileNameWithExtension = urlParts.pop();
                const fileName = fileNameWithExtension === null || fileNameWithExtension === void 0 ? void 0 : fileNameWithExtension.replace(/\.[^/.]+$/, '');
                const publicId = `${folder}/${fileName}`;
                const result = yield cloudinary_1.v2.uploader.destroy(publicId);
                if (result.result !== 'ok') {
                    throw new customError_1.CustomError('Failed to delete image', 500);
                }
            }
            catch (error) {
                console.error('Error deleting image:', error);
            }
        });
    }
}
exports.default = OptimisedImage;
//# sourceMappingURL=ImageService.js.map