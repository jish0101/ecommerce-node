"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helpers_1 = require("../../lib/helpers");
const wishlist_1 = __importDefault(require("../../controllers/wishlist"));
const router = express_1.default.Router();
const controller = new wishlist_1.default();
router.get("/get", (0, helpers_1.asyncWrapper)(controller.get));
router.put("/update", (0, helpers_1.asyncWrapper)(controller.update));
exports.default = router;
//# sourceMappingURL=wishlist.route.js.map