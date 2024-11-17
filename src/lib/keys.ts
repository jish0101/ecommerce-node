import path from "path";
import dotenv from "dotenv";

dotenv.config({
  path: path.resolve(__dirname, "..", "..", ".env"),
});

export const KEYS: Record<string, string> = {
  PORT: process.env.PORT!,
  API_ROUTE: process.env.API_ROUTE!,
  DB_URL: process.env.DB_URL!,
  JWT_SECRET: process.env.JWT_SECRET!,
  REFRESH_SECRET: process.env.REFRESH_SECRET!,
  EMAIL_HOST: process.env.EMAIL_HOST!,
  EMAIL_PORT: process.env.EMAIL_PORT!,
  EMAIL_SECURE: process.env.EMAIL_SECURE!,
  EMAIL_USER: process.env.EMAIL_USER!,
  EMAIL_PASS: process.env.EMAIL_PASS!,
};
