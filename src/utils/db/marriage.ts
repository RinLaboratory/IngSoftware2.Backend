import mongoose from "mongoose";
import z from "zod";

export const MarriageSchema = z.object({
  _id: z.string().regex(/^[0-9a-fA-F]{24}$/),
  m_place1: z.string(),
  m_place2: z.string(),
  m_partner_name: z.string(),
  m_partner_lastname: z.string(),
  m_date: z.string(),
  m_father: z.string(),
  m_padrino: z.string(),
  m_madrina: z.string(),
});

export type TMarriage = z.infer<typeof MarriageSchema>;

const dbMarriageSchema = new mongoose.Schema({
  m_place1: String,
  m_place2: String,
  m_partner_name: String,
  m_partner_lastname: String,
  m_date: String,
  m_father: String,
  m_padrino: String,
  m_madrina: String,
});

export const marriageModel = mongoose.model("matrimonio", dbMarriageSchema);
