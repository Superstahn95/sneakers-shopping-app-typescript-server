import express from "express";
import { config } from "dotenv";

config();
const PORT = process.env.PORT || 8080;
const app = express();

app.get("/", (req, res, next) => {
  res.status(200).send("Up and running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
