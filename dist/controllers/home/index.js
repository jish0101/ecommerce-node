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
const responseHelpers_1 = require("../../lib/responseHelpers");
const product_model_1 = require("../../models/product/product.model");
function getBestDeals() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield product_model_1.Product.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "categoryDetails",
                },
            },
            {
                $unwind: "$categoryDetails",
            },
            {
                $group: {
                    _id: "$category",
                    categoryName: { $first: "$categoryName" },
                    products: { $push: "$$ROOT" },
                },
            },
            {
                $project: {
                    categoryName: 1,
                    products: {
                        $slice: [
                            {
                                $filter: {
                                    input: "$products",
                                    as: "product",
                                    cond: { $gte: ["$$product.offerPriceDiscount", 0] },
                                },
                            },
                            4,
                        ],
                    },
                },
            },
        ]);
    });
}
function getHeroCarouselProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield product_model_1.Product.find().limit(4).select(["_id", "imageLinks"]);
    });
}
class HomeController {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const [bestDeals, heroCarousel] = yield Promise.all([
                getBestDeals(),
                getHeroCarouselProducts(),
            ]);
            const data = {
                bestDeals,
                heroCarousel,
            };
            res.json((0, responseHelpers_1.createResponse)(200, data, "Successfully fetched home data"));
        });
    }
}
exports.default = HomeController;
//# sourceMappingURL=index.js.map