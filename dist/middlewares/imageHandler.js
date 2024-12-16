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
exports.imgHandler = void 0;
const helpers_1 = require("../lib/helpers");
const ImageService_1 = __importDefault(require("../services/ImageService"));
const imgHandler = (dir, bodyKey) => (0, helpers_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    if (!files) {
        req.body[bodyKey] = [];
        return next();
    }
    const imgLinks = files.map((file) => {
        return new ImageService_1.default(file).getProfileImg({
            w: 500,
            h: 500,
            q: 80,
            folder: dir,
        });
    });
    const result = (yield Promise.all(imgLinks)).filter(r => r !== undefined);
    req.body[bodyKey] = result;
    next();
}));
exports.imgHandler = imgHandler;
//# sourceMappingURL=imageHandler.js.map