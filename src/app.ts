import cors from "cors";
import helmet from "helmet";
import routes from "./routes/index";
import corsOption from "./lib/corsOptions";
import type CustomError from "./types/api/CustomError";
import express, { NextFunction, Request, Response } from "express";
import { createResponse } from "./lib/responseHelpers";

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: false,
    frameguard: true,
  }),
);
app.use(cors(corsOption));
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
