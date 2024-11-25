"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.credentials = void 0;
const corsOptions_1 = require("../lib/corsOptions");
const credentials = (req, res, next) => {
    try {
        const { origin } = req.headers;
        if (!origin || corsOptions_1.allowedOrigins.includes(origin)) {
            res.set("Access-Control-Allow-Credentials", "true");
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.credentials = credentials;
//# sourceMappingURL=credentials.js.map