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
const responseHelpers_1 = require("../../lib/responseHelpers");
const paginationSchema_1 = require("../paginationSchema");
const zod_1 = require("zod");
const coupon_1 = require("../../models/coupon");
const schema_1 = require("./schema");
const idSchema_1 = __importDefault(require("../idSchema"));
const getSchema = paginationSchema_1.paginationSchema.merge(zod_1.z.object({ couponId: zod_1.z.string().optional() }));
class CouponController {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, limit, couponId } = getSchema.parse(req.query);
            const query = {};
            if (couponId) {
                query._id = couponId;
            }
            const total = yield coupon_1.Coupon.countDocuments(query);
            const data = yield coupon_1.Coupon.find(query)
                .skip((page - 1) * limit)
                .limit(limit);
            res.json((0, responseHelpers_1.createResponse)(200, data, "Coupon fetched successfully", {
                page,
                limit,
                total,
            }));
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = schema_1.createSchema.parse(req.body);
            const existingCoupon = yield coupon_1.Coupon.findOne({ name: result.name });
            if (existingCoupon) {
                return res.json((0, responseHelpers_1.createResponse)(400, null, "Coupon already exists"));
            }
            const createdCoupon = yield coupon_1.Coupon.create({
                name: result.name,
                expiry: result.expiry,
                maxDiscount: result.maxDiscount,
                minOrderValue: result.minOrderValue,
                discountPercent: result.discountPercent,
            });
            res.json((0, responseHelpers_1.createResponse)(200, createdCoupon, "Coupon created successfully"));
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = idSchema_1.default.merge(schema_1.createSchema).parse(req.body);
            const updatedCoupon = yield coupon_1.Coupon.findByIdAndUpdate(result._id, {
                name: result.name,
                expiry: result.expiry,
                maxDiscount: result.maxDiscount,
                minOrderValue: result.minOrderValue,
                discountPercent: result.discountPercent,
            }, { new: true });
            res.json((0, responseHelpers_1.createResponse)(200, updatedCoupon, "Coupon updated successfully"));
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id } = idSchema_1.default.parse(req.query);
            const result = yield coupon_1.Coupon.findByIdAndDelete(_id);
            res.json((0, responseHelpers_1.createResponse)(200, !!result, "Coupon deleted successfully"));
        });
    }
}
exports.default = CouponController;
//# sourceMappingURL=index.js.map