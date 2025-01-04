"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helpers_1 = require("../../lib/helpers");
const home_1 = __importDefault(require("../../controllers/home"));
const router = express_1.default.Router();
const controller = new home_1.default();
router.get("/get", (0, helpers_1.asyncWrapper)(controller.get));
exports.default = router;
//# sourceMappingURL=home.route.js.map