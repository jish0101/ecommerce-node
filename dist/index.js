"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const chalk_1 = __importDefault(require("chalk"));
const mongoose_1 = __importDefault(require("mongoose"));
const keys_1 = require("./lib/keys");
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const dbConnection_1 = __importDefault(require("./lib/dbConnection"));
const socketHandler_1 = require("./sockets/socketHandler");
(0, dbConnection_1.default)();
const { PORT } = keys_1.KEYS;
const httpServer = (0, http_1.createServer)(app_1.default);
const io = new socket_io_1.Server(httpServer);
(0, socketHandler_1.socketHandler)(io);
mongoose_1.default.connection.once("open", () => {
    httpServer
        .listen(PORT, () => {
        console.log(`${chalk_1.default.green("✓")} ${chalk_1.default.blue(`Server listening on port: ${PORT}`)}`);
    })
        .on("error", () => process.exit(1))
        .on("close", () => console.log("Server is closing.."));
});
//# sourceMappingURL=index.js.map