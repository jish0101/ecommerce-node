"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketHandler = socketHandler;
function socketHandler(io) {
    io.on("connection", (socket) => {
        console.log("Socket connected: ", socket.id);
        socket.on("disconnect", (socketID) => {
            console.log("Socket disconnected: ", socketID);
        });
    });
}
