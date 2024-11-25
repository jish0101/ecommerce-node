"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const keys_1 = require("../lib/keys");
const nodemailer_1 = __importDefault(require("nodemailer"));
const { EMAIL_HOST, EMAIL_PORT, EMAIL_SECURE, EMAIL_USER, EMAIL_PASS } = keys_1.KEYS;
const createTransporter = () => {
    const transporter = nodemailer_1.default.createTransport({
        host: EMAIL_HOST,
        port: parseInt(EMAIL_PORT, 10),
        secure: EMAIL_SECURE === "true",
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
        },
    });
    transporter.verify((error, success) => {
        if (error) {
            console.error("Error connecting to email server:", error);
        }
        else {
            console.log("Successfully connected to email server");
        }
    });
    return transporter;
};
exports.default = createTransporter;
//# sourceMappingURL=mailTransporter.js.map