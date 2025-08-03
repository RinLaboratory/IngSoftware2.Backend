import { z } from "zod";

const preprocessArr = (str: unknown) =>
  typeof str === "string" ? str.split(",").map((s) => s.trim()) : [];

const envValidationSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  SERVER_PORT:
    process.env.NODE_ENV === "production"
      ? z.coerce.number().int().positive()
      : z.coerce.number().int().positive().optional().default(5001),
  ALLOWED_CORS_ORIGINS: z.preprocess(
    preprocessArr,
    process.env.NODE_ENV === "production"
      ? z.array(z.string().url()).min(1)
      : z
          .array(z.string().url())
          .transform((arr) =>
            arr.length === 0
              ? ["http://localhost:3000", "http://localhost:5001"]
              : arr,
          ),
  ),
  DB_ADDRESS: z.string(),
  SECRET_JWT_SEED: z.string(),
  SECRET_JWT_SEED_EXPIRATION_TIME: z
    .string()
    .regex(/^\d+(s|m|h|d|y)$/, {
      message: "Must be a string like '10d', '1h', '30m', etc.",
    })
    .optional()
    .default("10d"),
  JWT_COOKIE_EXPIRES_IN: z.coerce
    .number()
    .int()
    .positive()
    .optional()
    .default(100000),
  HOW_MANY_HASHES: z.coerce.number().int().positive().optional().default(10),
});

export const env = {
  ...envValidationSchema.parse(process.env),
};
