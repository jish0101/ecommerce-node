"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helpers_1 = require("../../lib/helpers");
const address_controller_1 = __importDefault(require("../../controllers/address/address.controller"));
const router = express_1.default.Router();
const addressController = new address_controller_1.default();
router.get("/get", (0, helpers_1.asyncWrapper)(addressController.get));
router.put("/update", (0, helpers_1.asyncWrapper)(addressController.update));
router.post("/create", (0, helpers_1.asyncWrapper)(addressController.create));
router.delete("/delete", (0, helpers_1.asyncWrapper)(addressController.delete));
exports.default = router;
//# sourceMappingURL=address.route.js.map