"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, "..", `.env${process.env.NODE_ENV === "production" ? ".production" : ""}`),
});
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.json({ message: "Welcome to this api, this is a clone of x" });
});
exports.default = app;
