"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_route_1 = __importDefault(require("./cart.route"));
const order_route_1 = __importDefault(require("./order.route"));
const address_route_1 = __importDefault(require("./address.route"));
const wishlist_route_1 = __importDefault(require("./wishlist.route"));
const payments_route_1 = __importDefault(require("./payments.route"));
const router = express_1.default.Router();
router.use("/cart", cart_route_1.default);
router.use("/order", order_route_1.default);
router.use("/address", address_route_1.default);
router.use("/wishlist", wishlist_route_1.default);
router.use("/payments", payments_route_1.default);
exports.default = router;
//# sourceMappingURL=routes.js.map