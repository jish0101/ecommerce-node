"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = __importDefault(require("../../controllers/products/product.controller"));
const helpers_1 = require("../../lib/helpers");
const checkRoles_1 = __importDefault(require("../../middlewares/checkRoles"));
const multer_1 = __importDefault(require("../../lib/multer"));
const imageHandler_1 = require("../../middlewares/imageHandler");
const zodValidator_1 = __importDefault(require("../../middlewares/zodValidator"));
const productSchema_1 = require("../../controllers/products/productSchema");
const idSchema_1 = __importDefault(require("../../controllers/idSchema"));
const passport_1 = require("../../middlewares/passport");
const router = express_1.default.Router();
const productController = new product_controller_1.default();
router.post("/create", (0, passport_1.authenticateJwt)(), (0, checkRoles_1.default)(["ADMIN"]), multer_1.default.array("productImages", 4), (0, zodValidator_1.default)(productSchema_1.createProductSchema, "body"), (0, imageHandler_1.imgHandler)("products", "imageLinks"), (0, helpers_1.asyncWrapper)(productController.create));
router.put("/update", (0, passport_1.authenticateJwt)(), (0, checkRoles_1.default)(["ADMIN"]), multer_1.default.array("productImages", 4), (0, zodValidator_1.default)(productSchema_1.createProductSchema.merge(idSchema_1.default), "body"), (0, imageHandler_1.imgHandler)("products", "imageLinks"), (0, helpers_1.asyncWrapper)(productController.update));
router.delete("/delete", (0, passport_1.authenticateJwt)(), (0, checkRoles_1.default)(["ADMIN"]), (0, helpers_1.asyncWrapper)(productController.delete));
router.get("/get", (0, helpers_1.asyncWrapper)(productController.get));
exports.default = router;
//# sourceMappingURL=product.route.js.map