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
const wishlist_1 = __importDefault(require("../../models/wishlist"));
const responseHelpers_1 = require("../../lib/responseHelpers");
const schema = zod_1.z.object({
    flag: zod_1.z.enum(["U", "D"]),
    items: zod_1.z.array(zod_1.z.object({
        productId: zod_1.z.string(),
    })),
});
class WishlistController {
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const { items, flag } = schema.parse(req.body);
            const foundList = yield wishlist_1.default.findOne({ userId: user._id });
            // if no list exists, create a new one
            if (!foundList) {
                const cart = yield wishlist_1.default.create({ userId: user._id, items });
                return res.json((0, responseHelpers_1.createResponse)(200, cart, "Successfully updated item in wishlist"));
            }
            // if flag is delete, remove item from list
            if (flag === "D") {
                const hasItem = foundList.items.findIndex((item) => item.productId.toString() !== items[0].productId);
                if (hasItem === -1) {
                    return res.json((0, responseHelpers_1.createResponse)(200, foundList, "Item does not exist in wishlist"));
                }
                const list = yield wishlist_1.default.updateOne({ userId: user._id }, { items: foundList.items.splice(hasItem, 1) }, { new: true });
                return res.json((0, responseHelpers_1.createResponse)(200, list, "Successfully updated item in wishlist"));
            }
            // if flag is update, add item in list
            if (flag === "U") {
                const existsInList = foundList.items.findIndex((item) => item.productId.toString() === items[0].productId);
                if (existsInList === -1) {
                    const newItems = [...foundList.items, items[0]];
                    const list = yield wishlist_1.default.updateOne({ userId: user._id }, { items: newItems }, { new: true });
                    return res.json((0, responseHelpers_1.createResponse)(200, list, "Successfully updated item in wishlist"));
                }
                else {
                    return res.json((0, responseHelpers_1.createResponse)(200, foundList, "Item already exists in wishlist"));
                }
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const list = yield wishlist_1.default.find({ userId: user._id }).populate("items.productId");
            res.json((0, responseHelpers_1.createResponse)(200, list, "Successfully fetched wishlist"));
        });
    }
}
exports.default = WishlistController;
//# sourceMappingURL=index.js.map