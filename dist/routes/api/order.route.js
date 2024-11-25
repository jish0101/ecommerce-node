"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_controller_1 = __importDefault(require("../../controllers/order/order.controller"));
const helpers_1 = require("../../lib/helpers");
const checkRoles_1 = __importDefault(require("../../middlewares/checkRoles"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const orderController = new order_controller_1.default();
router.get("/get", (0, helpers_1.asyncWrapper)(orderController.get));
router.post("/create", (0, helpers_1.asyncWrapper)(orderController.create));
router.put("/update", (0, helpers_1.asyncWrapper)(orderController.update));
router.delete("/delete", (0, checkRoles_1.default)(["ADMIN"]), (0, helpers_1.asyncWrapper)(orderController.delete));
exports.default = router;
//# sourceMappingURL=order.route.js.map