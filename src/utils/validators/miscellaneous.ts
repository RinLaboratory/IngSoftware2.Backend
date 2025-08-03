import z from "zod";
import {
  BaptismSchema,
  ConfirmSchema,
  DocumentSchema,
  MarriageSchema,
  ParentSchema,
} from "../db";

export type ServerResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      msg: string;
    };

export const idSchema = z.object({
  _id: z.string().regex(/^[0-9a-fA-F]{24}$/),
});

export type TId = z.infer<typeof idSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type TLogin = z.infer<typeof loginSchema>;

export interface TDecodedToken {
  uuid: string;
  email: string;
  rol: string;
}

export type TDurationString = `${number}${"s" | "m" | "h" | "d" | "y"}`;

export const GetDocumentsSchema = z.object({
  search: z.string().optional(),
  selectValue: z.enum([
    "APELLIDO",
    "NOMBRE",
    "FECHAINSCRIPCION",
    "ID",
    "default",
    "exportPackage",
    "",
  ]),
});

export type TGetDocuments = z.infer<typeof GetDocumentsSchema>;

export const GetAdjacentDocumentsSchema = z.object({
  b_id: z.string().regex(/^[0-9a-fA-F]{24}$/),
  c_id: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(),
  m_id: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(),
  p_id: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(),
});

// WHAT THE ACTUAL FUCK IS THIS
export const UpdateParsedDocumentSchema = z.object({
  Documento: DocumentSchema.omit({
    nameE: true,
    lastnameE: true,
  }),
  A_parent: z.boolean(),
  parent_Data: ParentSchema.partial(),
  A_bautismo: z.boolean(),
  Bautismo: BaptismSchema.partial(),
  A_confirmacion: z.boolean(),
  Confirmacion: ConfirmSchema.partial(),
  A_matrimonio: z.boolean(),
  Matrimonio: MarriageSchema.partial(),
});

export type TUpdateParsedDocument = z.infer<typeof UpdateParsedDocumentSchema>;

export const ParsedDocumentSchema = z.object({
  Documento: DocumentSchema.omit({
    _id: true,
    nameE: true,
    lastnameE: true,
    Bautismo: true,
    Confirmacion: true,
    Matrimonio: true,
    parent_Data: true,
  }),
  A_parent: z.boolean(),
  parent_Data: ParentSchema.omit({ _id: true }).partial(),
  A_bautismo: z.boolean(),
  Bautismo: BaptismSchema.omit({ _id: true }).partial(),
  A_confirmacion: z.boolean(),
  Confirmacion: ConfirmSchema.omit({ _id: true }).partial(),
  A_matrimonio: z.boolean(),
  Matrimonio: MarriageSchema.omit({ _id: true }).partial(),
});

export type TParsedDocument = z.infer<typeof ParsedDocumentSchema>;

export const GetUsersSchema = z.object({
  search: z.enum(["NOMBRE", "APELLIDO", "CORREO", "ID", ""]).optional(),
  buscar: z.string().optional(),
});
