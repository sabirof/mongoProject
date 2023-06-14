import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import testRouter from "./routes/testRouter.js";
import restaurantsModel from "./models/restaurantsModel.js";
import restaurantsRouter from "./routes/restaurantsRouter.js";


const app = express();
dotenv.config();

const addMiddlewares = () => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(cors());
};

const startServer = () => {
  const port = process.env.PORT || 5174;
  app.listen(port, () => {
    console.log("Server is running on port " + port);
  });
};

const connectMongoDB = async () => {
  await mongoose.connect(process.env.MongoDB);
  console.log("Connected to MongoDB");
};

const loadRoutes = () => {
  app.use("/test", testRouter);
  app.use("/api/restaurants", restaurantsRouter);
};


(async function controller() {
  await connectMongoDB();
  addMiddlewares();
  loadRoutes();
  startServer();
})();
