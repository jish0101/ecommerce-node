import app from "./app";
import chalk from "chalk";
import { Server } from "socket.io";
import { createServer } from "http";
import { socketHandler } from "./sockets/socketHandler";
import { KEYS } from "./lib/keys";

const { PORT } = KEYS;
const httpServer = createServer(app);
const io = new Server(httpServer);

socketHandler(io);

httpServer
  .listen(PORT, () => {
    console.log(
      `${chalk.green("✓")} ${chalk.blue(`Server listening on port: ${PORT}`)}`,
    );
  })
  .on("error", () => process.exit(1))
  .on("close", () => console.log("Server is closing.."));
