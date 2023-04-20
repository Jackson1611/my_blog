import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import env from "./utils/validateEnv";
import blogRouter from "./routes/blog";
import morgan from "morgan";
import bodyParser from "body-parser";

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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
