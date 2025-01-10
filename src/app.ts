import cors from "cors";
import path from "path";
import morgan from "morgan";
import helmet from "helmet";
import express from "express";
import routes from "./routes/index";
import cookieParser from "cookie-parser";
import corsOption from "./lib/corsOptions";
import passport from "./middlewares/passport";
import { rateLimit } from "express-rate-limit";
import { createResponse } from "./lib/responseHelpers";
import { credentials } from "./middlewares/credentials";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.set("view engine", "ejs");

app.use(
  rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-7",
    legacyHeaders: false,
  }),
);
app.use(
  helmet({
    contentSecurityPolicy: false,
    frameguard: true,
  }),
);
app.use(credentials);
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(morgan("common"));
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
