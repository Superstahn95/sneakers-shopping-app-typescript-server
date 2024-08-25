import express from "express";
import { config } from "dotenv";
import authRoute from "./routes/auth.route";
import productRoute from "./routes/product.route";
import connectDb from "./config/db";
import globalErrorHandlerMiddleware from "./middlewares/errorMiddleware";

config();
const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());

app.get("/", (req, res, next) => {
  res.status(200).send("Up and running");
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/product", productRoute);

app.use(globalErrorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDb();
});
