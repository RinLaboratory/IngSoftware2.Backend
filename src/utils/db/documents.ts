import mongoose from "mongoose";
import z from "zod";

export const DocumentSchema = z.object({
  _id: z.string().regex(/^[0-9a-fA-F]{24}$/),
  n_id: z.string(),
  rut: z.string(),
  name: z.string(),
  nameE: z.string(),
  lastname: z.string(),
  lastnameE: z.string(),
  birth: z.string(),
  birthplace: z.string(),
  email: z.string(),
  Obs: z.string(),
  inscr_Date: z.string(),
  address: z.string(),
  phone: z.string(),
  Tomo: z.string(),
  Pag: z.string(),
  Referencia: z.string(),
  parent_Data: z.object({ p_id: z.string() }),
  Bautismo: z.object({ b_id: z.string() }),
  Confirmacion: z.object({ c_id: z.string() }),
  Matrimonio: z.object({ m_id: z.string() }),
});

export type TDocument = z.infer<typeof DocumentSchema>;

const dbDocumentSchema = new mongoose.Schema({
  n_id: String,
  rut: String,
  name: String,
  nameE: String,
  lastname: String,
  lastnameE: String,
  birth: String,
  birthplace: String,
  email: String,
  Obs: String,
  inscr_Date: String,
  address: String,
  phone: String,
  Tomo: String,
  Pag: String,
  Referencia: String,
  parent_Data: {
    p_id: String,
  },
  Bautismo: {
    b_id: String,
  },
  Confirmacion: {
    c_id: String,
  },
  Matrimonio: {
    m_id: String,
  },
});

export const documentModel = mongoose.model("documentos", dbDocumentSchema);
