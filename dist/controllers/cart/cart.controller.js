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
const zod_1 = require("zod");
const cart_model_1 = __importDefault(require("../../models/cart/cart.model"));
const responseHelpers_1 = require("../../lib/responseHelpers");
const idSchema_1 = __importDefault(require("../idSchema"));
const cartSchema = zod_1.z.object({
    items: zod_1.z.array(zod_1.z.object({
        productId: zod_1.z.string(),
        quantity: zod_1.z.number().min(1),
    })),
});
class CartController {
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const { items } = cartSchema.parse(req.body);
            const cart = yield cart_model_1.default.findOne({ userId: user._id });
            if (cart) {
                const cart = yield cart_model_1.default.updateOne({ userId: user._id }, { items }, { new: true });
                res.json((0, responseHelpers_1.createResponse)(200, cart, "Successfully updated item in cart"));
            }
            else {
                const cart = yield cart_model_1.default.create({ userId: user._id, items });
                res.json((0, responseHelpers_1.createResponse)(200, cart, "Successfully updated item in cart"));
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const { _id } = idSchema_1.default.parse(req.body);
            yield cart_model_1.default.findOneAndDelete({ $and: [{ _id }, { userId: user._id }] });
            res.json((0, responseHelpers_1.createResponse)(200, {}, "Successfully deleted item from cart"));
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const cart = yield cart_model_1.default.find({ userId: user._id }).populate("items.productId");
            res.json((0, responseHelpers_1.createResponse)(200, cart, "Successfully fetched cart"));
        });
    }
}
exports.default = CartController;
//# sourceMappingURL=cart.controller.js.map