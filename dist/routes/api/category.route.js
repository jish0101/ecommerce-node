"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_controller_1 = __importDefault(require("../../controllers/category/category.controller"));
const helpers_1 = require("../../lib/helpers");
const checkRoles_1 = __importDefault(require("../../middlewares/checkRoles"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const categoryController = new category_controller_1.default();
router.post("/create", (0, checkRoles_1.default)(["ADMIN"]), (0, helpers_1.asyncWrapper)(categoryController.create));
router.put("/update", (0, checkRoles_1.default)(["ADMIN"]), (0, helpers_1.asyncWrapper)(categoryController.update));
router.delete("/delete", (0, checkRoles_1.default)(["ADMIN"]), (0, helpers_1.asyncWrapper)(categoryController.delete));
router.get("/get", (0, helpers_1.asyncWrapper)(categoryController.get));
exports.default = router;
//# sourceMappingURL=category.route.js.map