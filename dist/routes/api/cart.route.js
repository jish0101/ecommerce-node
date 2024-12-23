"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cart_controller_1 = __importDefault(require("../../controllers/cart/cart.controller"));
const helpers_1 = require("../../lib/helpers");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controller = new cart_controller_1.default();
router.get('/get', (0, helpers_1.asyncWrapper)(controller.get));
router.put('/update', (0, helpers_1.asyncWrapper)(controller.update));
router.delete('/delete', (0, helpers_1.asyncWrapper)(controller.delete));
exports.default = router;
//# sourceMappingURL=cart.route.js.map