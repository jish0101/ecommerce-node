import { Server, Socket } from "socket.io";

export function socketHandler(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log("Socket connected: ", socket.id);

    socket.on("disconnect", (socketID) => {
      console.log("Socket disconnected: ", socketID);
    });
  });
}
