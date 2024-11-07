import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import routes from "./routes/index";
import cookieParser from "cookie-parser";
import corsOption from "./lib/corsOptions";
import type CustomError from "./types/api/CustomError";
import { createResponse } from "./lib/responseHelpers";
import express, { NextFunction, Request, Response } from "express";

const app = express();

app.set("view engine", "ejs");

app.use(
  helmet({
    contentSecurityPolicy: false,
    frameguard: true,
  }),
);
app.use(cookieParser());
app.use(morgan("common"));
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(routes);

app.get("/", (req, res) => {
  res.json(createResponse(200, undefined, "Server is working fine.."));
});

app.use((req, res, next) => {
  res.status(404).json(createResponse(404, undefined, "No route found"));
});

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  const response = createResponse(
    err.status || 500,
    undefined,
    err.message || "Internal Server Error",
    process.env.NODE_ENV === "development" ? err.stack : undefined,
  );

  res.status(err.status || 500).json(response);
});

export default app;
