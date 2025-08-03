/* eslint-disable @typescript-eslint/no-unsafe-argument */
import http from "http";
import express from "express";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import helmet from "helmet";
import corsMiddleware from "./middlewares/cors";
import appRouter from "./routes";
import mongoose from "mongoose";
import { env } from "./env";

export async function createExpressApp() {
  const app = express();
  const server = http.createServer(app);
  await mongoose.connect(env.DB_ADDRESS);

  // 1) GLOBAL MIDDLEWARES
  app.set("trust proxy", 1);
  app.use(helmet()).use(corsMiddleware());

  app.use(express.json({ limit: "25mb" }));
  app.use(express.urlencoded({ limit: "25mb" }));

  app.use((req, res, next) => {
    if (
      mongoSanitize.has(req.body) ||
      mongoSanitize.has(req.query) ||
      mongoSanitize.has(req.params)
    ) {
      return res.status(500).json({
        msg: "internal server error",
      });
    }
    next();
  });
  app.use(hpp({ whitelist: ["name"] }));

  app.use("/", appRouter);

  return { app, server };
}
