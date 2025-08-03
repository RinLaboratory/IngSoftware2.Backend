import cors from "cors";
import type { NextFunction, Request, Response } from "express";
import { env } from "~/env";

export default function corsMiddleware() {
  const acceptedOrigins = env.ALLOWED_CORS_ORIGINS;

  const corsOptions = {
    origin: (origin, callback) => {
      if (origin && acceptedOrigins.includes(origin)) {
        return callback(null, true);
      }

      if (!origin) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  } satisfies cors.CorsOptions;

  return [
    // Cors Middleware
    cors(corsOptions),
    // Error handling middleware specifically for CORS errors
    (err: Error, req: Request, res: Response, next: NextFunction) => {
      if (err.message === "Not allowed by CORS") {
        res.status(401).json({ error: "CORS error: Origin not allowed" });
      } else {
        next(err); // Pass other errors to the next error handler
      }
    },
  ];
}
