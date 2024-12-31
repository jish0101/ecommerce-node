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
const idSchema_1 = __importDefault(require("../idSchema"));
const customError_1 = require("../../lib/customError");
const paginationSchema_1 = require("../paginationSchema");
const responseHelpers_1 = require("../../lib/responseHelpers");
const validationSchema_1 = require("./validationSchema");
const category_model_1 = require("../../models/category/category.model");
class Category {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, limit } = paginationSchema_1.paginationSchema.parse(req.query);
            const [categories, total] = yield Promise.all([
                category_model_1.Category.find()
                    .skip((page - 1) * limit)
                    .limit(limit),
                category_model_1.Category.countDocuments()
            ]);
            res.json((0, responseHelpers_1.createResponse)(200, categories, "Successfully fetched categories", { page, limit, total }));
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = validationSchema_1.createCategorySchema.parse(req.body);
            const existingCategory = yield category_model_1.Category.findOne({ name: body.name });
            if (existingCategory) {
                throw new customError_1.CustomError("Category already exists", 400);
            }
            const createdCategory = yield category_model_1.Category.create(body);
            res.json((0, responseHelpers_1.createResponse)(200, createdCategory, "Successfully created a category"));
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = validationSchema_1.createCategorySchema.merge(idSchema_1.default).parse(req.body);
            const updatedUser = yield category_model_1.Category.findOneAndUpdate({ _id: body._id }, { name: body.name }, { new: true }).select("-__v");
            res.json((0, responseHelpers_1.createResponse)(200, updatedUser, "Successfully updated a category"));
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = idSchema_1.default.parse(req.query);
            const deletedUser = yield category_model_1.Category.findOneAndDelete({ _id: body._id });
            res.json((0, responseHelpers_1.createResponse)(200, deletedUser, "Successfully deleted a category"));
        });
    }
}
exports.default = Category;
//# sourceMappingURL=category.controller.js.map