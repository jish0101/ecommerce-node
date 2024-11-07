import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to this api, this is a clone of x" });
});

export default app;
