"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const keys_1 = require("./keys");
const sessionOptions = {
    secret: keys_1.KEYS.REFRESH_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24,
    },
};
exports.default = sessionOptions;
//# sourceMappingURL=sessionConfig.js.map