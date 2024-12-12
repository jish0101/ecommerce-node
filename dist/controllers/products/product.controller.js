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
const responseHelpers_1 = require("../../lib/responseHelpers");
const productSchema_1 = require("./productSchema");
const product_model_1 = require("../../models/product/product.model");
const idSchema_1 = __importDefault(require("../idSchema"));
const customError_1 = require("../../lib/customError");
const ImageService_1 = __importDefault(require("../../services/ImageService"));
const paginationSchema_1 = require("../paginationSchema");
class ProductController {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, limit } = paginationSchema_1.paginationSchema.parse(req.query);
            const products = yield product_model_1.Product.find()
                .skip((page - 1) * limit)
                .limit(limit);
            return res.json((0, responseHelpers_1.createResponse)(200, products, "Successfully fetched products"));
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const result = productSchema_1.createProductSchema.parse(req.body);
            const existing = yield product_model_1.Product.findOne({ name: result.name });
            if (existing) {
                const img = new ImageService_1.default();
                existing.imageLinks.forEach((link) => {
                    return img.deleteImageByLink(link);
                });
                throw new customError_1.CustomError("Product already exists", 400);
            }
            const product = yield product_model_1.Product.create({
                name: result.name,
                desc: result.desc,
                price: result.price,
                stock: result.stock,
                createdBy: user._id,
                updatedBy: user._id,
                category: result.category,
                imageLinks: result.imageLinks,
            });
            return res.json((0, responseHelpers_1.createResponse)(200, product, "Successfully created product"));
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const result = productSchema_1.createProductSchema.merge(idSchema_1.default).parse(req.body);
            const product = yield product_model_1.Product.findById(result._id);
            if (!product) {
                if (result.imageLinks && result.imageLinks.length > 0) {
                    const img = new ImageService_1.default();
                    result.imageLinks.forEach((link) => {
                        return img.deleteImageByLink(link);
                    });
                }
                throw new customError_1.CustomError("Product not found", 404);
            }
            if (result.imageLinks && result.imageLinks.length > 0) {
                const img = new ImageService_1.default();
                product.imageLinks.forEach((link) => {
                    return img.deleteImageByLink(link);
                });
            }
            const updatedProduct = yield product_model_1.Product.findByIdAndUpdate(result._id, {
                name: result.name,
                desc: result.desc,
                price: result.price,
                stock: result.stock,
                updatedBy: user._id,
                category: result.category,
                imageLinks: result.imageLinks,
            }, {
                new: true,
            });
            return res.json((0, responseHelpers_1.createResponse)(200, updatedProduct, "Successfully updated product"));
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = idSchema_1.default.parse(req.body);
            const product = yield product_model_1.Product.findOne({ _id: result._id });
            if (!product) {
                throw new customError_1.CustomError("Product not found", 404);
            }
            const img = new ImageService_1.default();
            product.imageLinks.forEach((link) => img.deleteImageByLink(link));
            const deletedProduct = yield product_model_1.Product.findByIdAndDelete(result._id);
            return res.json((0, responseHelpers_1.createResponse)(200, deletedProduct, "Successfully deleted product"));
        });
    }
}
exports.default = ProductController;
//# sourceMappingURL=product.controller.js.map