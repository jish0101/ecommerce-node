"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_route_1 = __importDefault(require("./order.route"));
const product_route_1 = __importDefault(require("./product.route"));
const address_route_1 = __importDefault(require("./address.route"));
const category_route_1 = __importDefault(require("./category.route"));
const payments_route_1 = __importDefault(require("./payments.route"));
const router = express_1.default.Router();
router.use("/order", order_route_1.default);
router.use("/address", address_route_1.default);
router.use("/products", product_route_1.default);
router.use("/payments", payments_route_1.default);
router.use("/categories", category_route_1.default);
exports.default = router;
//# sourceMappingURL=routes.js.map