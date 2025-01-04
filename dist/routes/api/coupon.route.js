"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const coupon_1 = __importDefault(require("../../controllers/coupon"));
const helpers_1 = require("../../lib/helpers");
const passport_1 = require("../../middlewares/passport");
const checkRoles_1 = __importDefault(require("../../middlewares/checkRoles"));
const router = express_1.default.Router();
const controller = new coupon_1.default();
router.get("/get", (0, helpers_1.asyncWrapper)(controller.get));
router.put("/update", (0, passport_1.authenticateJwt)(), (0, checkRoles_1.default)(["ADMIN"]), (0, helpers_1.asyncWrapper)(controller.update));
router.post("/create", (0, passport_1.authenticateJwt)(), (0, checkRoles_1.default)(["ADMIN"]), (0, helpers_1.asyncWrapper)(controller.create));
router.delete("/delete", (0, passport_1.authenticateJwt)(), (0, checkRoles_1.default)(["ADMIN"]), (0, helpers_1.asyncWrapper)(controller.delete));
exports.default = router;
//# sourceMappingURL=coupon.route.js.map