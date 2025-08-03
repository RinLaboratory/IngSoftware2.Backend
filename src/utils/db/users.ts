import mongoose from "mongoose";
import z from "zod";

export const UserSchema = z.object({
  _id: z.string().regex(/^[0-9a-fA-F]{24}$/),
  name: z.string(),
  nameE: z.string(),
  lastname: z.string(),
  lastnameE: z.string(),
  email: z.string().email(),
  password_id: z.string(),
  rol: z.string(),
  phone: z.string(),
  lastSeen: z
    .preprocess((val) => {
      if (typeof val === "string" || val instanceof Date) {
        const date = new Date(val);
        if (!isNaN(date.getTime())) {
          return date;
        }
      }
      return val;
    }, z.date())
    .optional(),
});

export type TSafeUser = z.infer<typeof UserSchema>;

export const InsertUserSchema = UserSchema.pick({
  name: true,
  lastname: true,
  email: true,
  rol: true,
  phone: true,
}).extend({
  password: z.string(),
});

export type TInsertUser = z.infer<typeof InsertUserSchema>;

export const UpdateUserSchema = InsertUserSchema.extend({
  password: z.string().optional(),
});

export type TUpdateUser = z.infer<typeof UpdateUserSchema>;

const dbUserSchema = new mongoose.Schema({
  name: String,
  nameE: String,
  lastname: String,
  lastnameE: String,
  email: String,
  password_id: String,
  rol: String,
  phone: String,
  lastSeen: Date,
});

dbUserSchema.index({ name: "text" });
export const usersModel = mongoose.model("usuarios", dbUserSchema);
