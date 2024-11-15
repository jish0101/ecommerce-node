import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import express from "express";
import passport from "passport";
import routes from "./routes/index";
import cookieParser from "cookie-parser";
import corsOption from "./lib/corsOptions";
import { createResponse } from "./lib/responseHelpers";
import { credentials } from "./middlewares/credentials";
import { authenticateJwt } from "./middlewares/passport";
import { errorHandler } from "./middlewares/errorHandler";
import path from "path";

const app = express();

app.set("view engine", "ejs");

app.use(
  helmet({
    contentSecurityPolicy: false,
    frameguard: true,
  }),
);
app.use(express.static(path.join(__dirname, "public")));

app.use(credentials);
app.use(cors(corsOption));
app.use(passport.initialize());
app.use(authenticateJwt());
app.use(morgan("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(routes);

app.get("/", (req, res) => {
  res.json(createResponse(200, undefined, "Server is working fine.."));
});

app.use((req, res, next) => {
  res.status(404).json(createResponse(404, undefined, "No route found"));
});

app.use(errorHandler);

export default app;
