"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const socketHandler_1 = require("./sockets/socketHandler");
const PORT = process.env.PORT;
const httpServer = (0, http_1.createServer)(app_1.default);
const io = new socket_io_1.Server(httpServer);
(0, socketHandler_1.socketHandler)(io);
httpServer.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
