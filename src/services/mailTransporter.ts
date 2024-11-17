import { KEYS } from "@/lib/keys";
import nodemailer from "nodemailer";

const { EMAIL_HOST, EMAIL_PORT, EMAIL_SECURE, EMAIL_USER, EMAIL_PASS } = KEYS;

const createTransporter = () => {
  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: parseInt(EMAIL_PORT, 10),
    secure: EMAIL_SECURE === "true",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  transporter.verify((error, success) => {
    if (error) {
      console.error("Error connecting to email server:", error);
    } else {
      console.log("Successfully connected to email server");
    }
  });

  return transporter;
};

export default createTransporter;
