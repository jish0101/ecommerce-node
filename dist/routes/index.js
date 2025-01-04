"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const keys_1 = require("../lib/keys");
const routes_1 = __importDefault(require("./api/routes"));
const home_route_1 = __importDefault(require("./api/home.route"));
const auth_route_1 = __importDefault(require("./api/auth.route"));
const user_route_1 = __importDefault(require("./api/user.route"));
const coupon_route_1 = __importDefault(require("./api/coupon.route"));
const product_route_1 = __importDefault(require("./api/product.route"));
const category_route_1 = __importDefault(require("./api/category.route"));
const sub_category_route_1 = __importDefault(require("./api/sub-category.route"));
const passport_1 = require("../middlewares/passport");
const { API_ROUTE } = keys_1.KEYS;
const router = express_1.default.Router();
// unprotected/partially-protected routes
router.use("/auth", auth_route_1.default);
router.use(`${API_ROUTE}/home`, home_route_1.default);
router.use(`${API_ROUTE}/users`, user_route_1.default);
router.use(`${API_ROUTE}/coupon`, coupon_route_1.default);
router.use(`${API_ROUTE}/products`, product_route_1.default);
router.use(`${API_ROUTE}/categories`, category_route_1.default);
router.use(`${API_ROUTE}/sub-categories`, sub_category_route_1.default);
// protected routes
router.use(API_ROUTE, (0, passport_1.authenticateJwt)());
router.use(API_ROUTE, routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map