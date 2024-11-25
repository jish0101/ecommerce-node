"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helpers_1 = require("../../lib/helpers");
const checkRoles_1 = __importDefault(require("../../middlewares/checkRoles"));
const user_controller_1 = __importDefault(require("../../controllers/user/user.controller"));
const multer_1 = __importDefault(require("../../lib/multer"));
const router = express_1.default.Router();
const userController = new user_controller_1.default();
router.get("/get", (0, checkRoles_1.default)(["ADMIN"]), (0, helpers_1.asyncWrapper)(userController.get));
router.post("/create", (0, helpers_1.asyncWrapper)(userController.create));
router.put("/update", (0, helpers_1.asyncWrapper)(userController.update));
router.put("/profile", multer_1.default.single("profile"), (0, helpers_1.asyncWrapper)(userController.updateProfile));
router.delete("/delete", (0, checkRoles_1.default)(["ADMIN"]), (0, helpers_1.asyncWrapper)(userController.delete));
exports.default = router;
//# sourceMappingURL=user.route.js.map