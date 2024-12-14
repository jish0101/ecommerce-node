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
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = require("../../lib/customError");
const order_model_1 = require("../../models/order/order.model");
const responseHelpers_1 = require("../../lib/responseHelpers");
const validationSchema_1 = require("./validationSchema");
const address_model_1 = require("../../models/address/address.model");
const product_model_1 = require("../../models/product/product.model");
const paginationSchema_1 = require("../paginationSchema");
class OrderController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { productData } = validationSchema_1.createOrderSchema.parse(req.body);
            const payloadUser = req.user;
            const [addressDoc, products] = yield Promise.all([
                address_model_1.Address.findOne({
                    $and: [{ user: payloadUser._id }, { isPrimary: true }],
                }),
                product_model_1.Product.find({
                    _id: { $in: productData.map((p) => p.productId) },
                }).lean(),
            ]);
            if (!products || products.length < 1) {
                throw new customError_1.CustomError("Products not found", 404);
            }
            if (!addressDoc) {
                throw new customError_1.CustomError("Address not found", 404);
            }
            const excludedProducts = [];
            const productIdWithNewStocks = [];
            const totalOrderCost = products.reduce((prev, product) => {
                const currentProd = productData.find((prod) => prod.productId === product._id.toString());
                // incase: stock is insufficient or product not found
                if (!currentProd || product.stock < currentProd.quantity) {
                    excludedProducts.push(product);
                    return 0;
                }
                productIdWithNewStocks.push({
                    _id: currentProd.productId,
                    stock: product.stock - currentProd.quantity,
                });
                return prev + product.price * currentProd.quantity;
            }, 0);
            if (productIdWithNewStocks.length > 0) {
                // Updated stocks for ordered products
                const bulkOperations = productIdWithNewStocks.map((product) => ({
                    updateOne: {
                        filter: { _id: product._id },
                        update: { stock: product.stock },
                    },
                }));
                yield product_model_1.Product.bulkWrite(bulkOperations);
            }
            const { street, city, state, country, pinCode } = addressDoc;
            const createdOrder = yield order_model_1.Order.create({
                address: `${street}, ${city}, ${state}, ${country}, ${pinCode}`,
                orderItems: productData,
                customer: payloadUser._id,
                orderPrice: totalOrderCost,
            });
            return res.json((0, responseHelpers_1.createResponse)(200, createdOrder, "Successfully created an order", {
                excludedProducts: excludedProducts,
                reason: "Product(s) not found/insufficient stock(s)",
            }));
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const { page, limit } = paginationSchema_1.paginationSchema.parse(req.query);
            const orders = yield order_model_1.Order.find({ customer: user._id })
                .skip((page - 1) * limit)
                .limit(limit);
            return res.json((0, responseHelpers_1.createResponse)(200, orders, "Successfully fetched orders"));
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const payloadUser = req.user;
            const { status, orderId } = validationSchema_1.updateOrderSchema.parse(req.body);
            const updatedOrder = yield order_model_1.Order.findOneAndUpdate({ $and: [{ _id: orderId }, { customer: payloadUser._id }] }, {
                status,
            }, {
                new: true,
            }).lean();
            return res.json((0, responseHelpers_1.createResponse)(200, updatedOrder, "Successfully updated the order"));
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const { orderId } = validationSchema_1.deletedOrderSchema.parse(req.query);
            const deletedOrder = yield order_model_1.Order.findOneAndDelete({
                $and: [{ _id: orderId }, { customer: user._id }],
            }).lean();
            return res.json((0, responseHelpers_1.createResponse)(200, deletedOrder, "Successfully deleted an order"));
        });
    }
}
exports.default = OrderController;
//# sourceMappingURL=order.controller.js.map