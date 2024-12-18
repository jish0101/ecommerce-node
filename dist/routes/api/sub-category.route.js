"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helpers_1 = require("../../lib/helpers");
const checkRoles_1 = __importDefault(require("../../middlewares/checkRoles"));
const sub_category_1 = __importDefault(require("../../controllers/sub-category"));
const router = express_1.default.Router();
const controller = new sub_category_1.default();
router.post("/create", (0, checkRoles_1.default)(["ADMIN"]), (0, helpers_1.asyncWrapper)(controller.create));
router.put("/update", (0, checkRoles_1.default)(["ADMIN"]), (0, helpers_1.asyncWrapper)(controller.update));
router.delete("/delete", (0, checkRoles_1.default)(["ADMIN"]), (0, helpers_1.asyncWrapper)(controller.delete));
router.get("/get", (0, helpers_1.asyncWrapper)(controller.get));
exports.default = router;
//# sourceMappingURL=sub-category.route.js.map