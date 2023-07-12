import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
 import passport from "passport";

 import cloudinaryConfig from "./config/cloudinary.js";
 import passportStrategy from "./config/passportConfig.js";

import testRouter from "./routes/testRouter.js";

import restaurantsRouter from "./routes/restaurantsRouter.js";
import shopsRouter from "./routes/shopsRouter.js";
import usersRouter from "./routes/usersRouter.js"
import postsRouter from "./routes/postsRouter.js"






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
  cloudinaryConfig();
  passportStrategy(passport);
};

const startServer = () => {
  const port = process.env.PORT || 5000;
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
  app.use("/api/shops", shopsRouter);
  app.use("/api/users", usersRouter);
//   app.post("/api/users",userRouter );
  app.use("/api/posts", postsRouter);
};

(async function controller() {
  await connectMongoDB();
  addMiddlewares();
  loadRoutes();
  startServer();
})();