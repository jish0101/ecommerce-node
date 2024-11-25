"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
// import { KEYS } from "./lib/keys";
// import session from "express-session";
// import sessionOptions from "./lib/sessionConfig";
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const corsOptions_1 = __importDefault(require("./lib/corsOptions"));
const passport_1 = __importDefault(require("./middlewares/passport"));
const express_rate_limit_1 = require("express-rate-limit");
const responseHelpers_1 = require("./lib/responseHelpers");
const credentials_1 = require("./middlewares/credentials");
const errorHandler_1 = require("./middlewares/errorHandler");
const app = (0, express_1.default)();
app.set("view engine", "ejs");
app.use((0, express_rate_limit_1.rateLimit)({
    windowMs: 5 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-7",
    legacyHeaders: false,
}));
app.use((0, helmet_1.default)({
    contentSecurityPolicy: false,
    frameguard: true,
}));
app.use(credentials_1.credentials);
app.use((0, cors_1.default)(corsOptions_1.default));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use(passport_1.default.initialize());
app.use((0, morgan_1.default)("common"));
app.use((0, cookie_parser_1.default)());
app.use(index_1.default);
app.get("/", (req, res) => {
    res.json((0, responseHelpers_1.createResponse)(200, undefined, "Server is working fine.."));
});
app.use((req, res, next) => {
    res.status(404).json((0, responseHelpers_1.createResponse)(404, undefined, "No route found"));
});
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map