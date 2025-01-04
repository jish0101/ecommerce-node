"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const razorpay_1 = __importDefault(require("razorpay"));
const keys_1 = require("../../lib/keys");
const customError_1 = require("../../lib/customError");
const order_model_1 = require("../../models/order/order.model");
const responseHelpers_1 = require("../../lib/responseHelpers");
const validationSchema_1 = require("./validationSchema");
const payment_model_1 = require("../../models/payment/payment.model");
const paginationSchema_1 = require("../paginationSchema");
const getRazorPay = () => new razorpay_1.default({
    key_id: keys_1.KEYS.RAZOR_PAY_KEY_ID,
    key_secret: keys_1.KEYS.RAZOR_PAY_KEY_SECRET,
});
class PaymentsController {
    createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = validationSchema_1.createPaymentOrder.parse(req.body);
            const orderDoc = yield order_model_1.Order.findById(result.orderId).populate("customer", "fullName email");
            if (!orderDoc) {
                throw new customError_1.CustomError("Order not found", 404);
            }
            const options = {
                currency: "INR",
                receipt: result.orderId,
                amount: orderDoc.orderPrice * 100,
            };
            const rp = getRazorPay();
            rp.orders.create(options, (err, rpOrder) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    throw new customError_1.CustomError("Server error: failed to create payment order", 500);
                }
                const data = {
                    order_id: rpOrder.id,
                    amount: orderDoc.orderPrice * 100,
                    key_id: keys_1.KEYS.RAZOR_PAY_KEY_ID,
                    contact: orderDoc.customer.email,
                    name: orderDoc.customer.fullName,
                    email: orderDoc.customer.email,
                };
                yield payment_model_1.Payments.create({
                    orderId: result.orderId,
                    razorpay_order_id: rpOrder.id,
                    razorpay_payment_id: "",
                    razorpay_signature: "",
                });
                res.json((0, responseHelpers_1.createResponse)(200, data, "Successfully create a payment order"));
            }));
        });
    }
    paymentVerification(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = validationSchema_1.paymentSchema.parse(req.body);
            const body = razorpay_order_id + "|" + razorpay_payment_id;
            const expectedSignature = crypto_1.default
                .createHmac("sha256", keys_1.KEYS.RAZOR_PAY_KEY_SECRET)
                .update(body.toString())
                .digest("hex");
            const isAuthentic = expectedSignature === razorpay_signature;
            if (!isAuthentic) {
                throw new customError_1.CustomError("Invalid Credentials", 400);
            }
            const payment = yield payment_model_1.Payments.findOne({ razorpay_order_id });
            if (!payment) {
                throw new customError_1.CustomError("Server error: failed to update payment status", 500);
            }
            payment.status = "paid";
            yield payment.save();
            res.redirect(`${keys_1.KEYS.CLIENT_BASE_URL}`);
        });
    }
    getPayments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, limit } = paginationSchema_1.paginationSchema.parse(req.query);
            const payments = yield payment_model_1.Payments.find()
                .skip((page - 1) * limit)
                .limit(limit);
            res.json((0, responseHelpers_1.createResponse)(200, payments, "Successfully fetched payments"));
        });
    }
}
exports.default = PaymentsController;
//# sourceMappingURL=payments.controller.js.map