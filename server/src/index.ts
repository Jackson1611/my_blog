import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import env from "./utils/validateEnv";
import blogRouter from "./routes/blog";
import userRouter from "./routes/user";
import morgan from "morgan";
import bodyParser from "body-parser";
import createHttpError, { isHttpError } from "http-errors";

// Connect to MongoDB
const app: Express = express();
const port = env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json());

mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
