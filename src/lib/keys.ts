import path from "path";
import dotenv from "dotenv";

dotenv.config(process.env.NODE_ENV === "development" ? {
  path: path.resolve(__dirname, "..", "..", ".env"),
}: undefined);

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
  RAZOR_PAY_KEY_ID: process.env.RAZOR_PAY_KEY_ID!,
  RAZOR_PAY_KEY_SECRET: process.env.RAZOR_PAY_KEY_SECRET!,
  BASE_URL: process.env.BASE_URL!,
  CLIENT_BASE_URL: process.env.CLIENT_BASE_URL!,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
};