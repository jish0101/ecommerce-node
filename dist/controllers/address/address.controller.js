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
const idSchema_1 = __importDefault(require("../idSchema"));
const responseHelpers_1 = require("../../lib/responseHelpers");
const address_model_1 = require("../../models/address/address.model");
const validationSchema_1 = require("./validationSchema");
const customError_1 = require("../../lib/customError");
const paginationSchema_1 = require("../paginationSchema");
class AddressController {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, limit } = paginationSchema_1.paginationSchema.parse(req.query);
            const [data, total] = yield Promise.all([
                address_model_1.Address.find()
                    .skip((page - 1) * limit)
                    .limit(limit),
                address_model_1.Address.countDocuments(),
            ]);
            res.json((0, responseHelpers_1.createResponse)(200, data, "Successfully fetched addresses", { page, limit, total }));
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = validationSchema_1.createAddressSchema.parse(req.body);
            const user = req.user;
            if (payload.isPrimary === true) {
                yield address_model_1.Address.findOneAndUpdate({ isPrimary: true }, { isPrimary: false });
            }
            const createdAddress = yield address_model_1.Address.create({
                pinCode: payload.pinCode,
                country: payload.country,
                state: payload.state,
                city: payload.city,
                street: payload.street,
                isPrimary: payload.isPrimary,
                user: user._id,
            });
            res.json((0, responseHelpers_1.createResponse)(200, createdAddress, "Successfully created user address"));
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const payload = validationSchema_1.createAddressSchema.merge(idSchema_1.default).parse(req.body);
            if (payload.isPrimary === true) {
                yield address_model_1.Address.findOneAndUpdate({ user: user._id, isPrimary: true }, { isPrimary: false });
            }
            const updatedAddress = yield address_model_1.Address.findOneAndUpdate({
                $and: [{ user: user._id }, { _id: payload._id }],
            }, {
                pinCode: payload.pinCode,
                country: payload.country,
                state: payload.state,
                city: payload.city,
                street: payload.street,
                isPrimary: payload.isPrimary,
                user: user._id,
            }, { new: true }).lean();
            res.json((0, responseHelpers_1.createResponse)(200, updatedAddress, "Successfully updated user address"));
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = idSchema_1.default.parse(req.query);
            const user = req.user;
            if (!user || !user._id) {
                throw new customError_1.CustomError("User not found", 400);
            }
            const deletedAddress = yield address_model_1.Address.findOneAndDelete({
                $and: [{ user: user._id }, { _id: payload._id }, { isPrimary: false }],
            }, { new: true }).lean();
            if (!deletedAddress) {
                throw new customError_1.CustomError("Non primary address not found", 404);
            }
            res.json((0, responseHelpers_1.createResponse)(200, deletedAddress, "Successfully deleted address"));
        });
    }
}
exports.default = AddressController;
//# sourceMappingURL=address.controller.js.map