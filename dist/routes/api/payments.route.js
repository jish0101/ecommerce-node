"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const payments_controller_1 = __importDefault(require("../../controllers/payments/payments.controller"));
const helpers_1 = require("../../lib/helpers");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const paymentsController = new payments_controller_1.default();
router.get("/get", (0, helpers_1.asyncWrapper)(paymentsController.getPayments));
router.post("/initiate-order", (0, helpers_1.asyncWrapper)(paymentsController.createOrder));
router.post("/paymentVerification", (0, helpers_1.asyncWrapper)(paymentsController.paymentVerification));
exports.default = router;
//# sourceMappingURL=payments.route.js.map