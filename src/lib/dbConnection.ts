import { KEYS } from "./keys";
import mongoose from "mongoose";

const connectDb = () => {
  const { DB_URL } = KEYS;

  return mongoose.connect(DB_URL);
};

export default connectDb;
