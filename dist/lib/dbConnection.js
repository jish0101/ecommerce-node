"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const keys_1 = require("./keys");
const mongoose_1 = __importDefault(require("mongoose"));
const connectDb = () => {
    const { DB_URL } = keys_1.KEYS;
    return mongoose_1.default.connect(DB_URL);
};
exports.default = connectDb;
//# sourceMappingURL=dbConnection.js.map