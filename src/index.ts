import app from "./app";
import chalk from "chalk";
import mongoose from "mongoose";
import { KEYS } from "./lib/keys";
import { Server } from "socket.io";
import { createServer } from "http";
import connectDb from "./lib/dbConnection";
import { socketHandler } from "./sockets/socketHandler";

connectDb();

const { PORT } = KEYS;
const httpServer = createServer(app);
const io = new Server(httpServer);

socketHandler(io);

mongoose.connection.once("open", () => {
  httpServer
    .listen(PORT, () => {
      console.log(
        `${chalk.green("✓")} ${chalk.blue(`Server listening on port: ${PORT}`)}`,
      );
    })
    .on("error", () => process.exit(1))
    .on("close", () => console.log("Server is closing.."));
});
