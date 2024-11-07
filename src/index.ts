import app from "./app";
import path from "path";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { createServer } from "http";
import { socketHandler } from "./sockets/socketHandler";

dotenv.config({
  path: path.resolve(__dirname, "..", ".env"),
});

const PORT = process.env.PORT;
const httpServer = createServer(app);
const io = new Server(httpServer);

socketHandler(io);

httpServer
  .listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  })
  .on("error", () => {
    if (!PORT) {
      console.log("PORT is not defined");
    }
    process.exit(1);
  })
  .on("close", () => console.log("Server is closing.."));
