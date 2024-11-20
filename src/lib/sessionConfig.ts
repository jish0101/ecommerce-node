import { SessionOptions } from "express-session";
import { KEYS } from "./keys";

const sessionOptions: SessionOptions = {
  secret: KEYS.REFRESH_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24,
  },
};

export default sessionOptions;
