import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import env from "./utils/validateEnv";
import blogRouter from "./routes/blog";

const app: Express = express();
const port = env.PORT;
app.use(cors());

mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/blogs", blogRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
