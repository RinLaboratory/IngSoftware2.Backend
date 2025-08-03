import mongoose from "mongoose";
import z from "zod";

export const PasswordSchema = z.object({
  _id: z.string().regex(/^[0-9a-fA-F]{24}$/),
  password: z.string(),
});

export type TPassword = z.infer<typeof PasswordSchema>;

export const InsertPasswordSchema = PasswordSchema.pick({
  password: true,
});

export type TInsertPassword = z.infer<typeof InsertPasswordSchema>;

const dbPasswordSchema = new mongoose.Schema({
  password: String,
});

export const passwordsModel = mongoose.model("password", dbPasswordSchema);
