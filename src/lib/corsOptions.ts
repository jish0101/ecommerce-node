import { CorsOptions } from "cors";

export const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:8080",
];

const corsOption: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

export default corsOption;
