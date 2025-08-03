import type {
  TBaptism,
  TConfirm,
  TDocument,
  TMarriage,
  TParent,
} from "~/utils/db";
import {
  baptismModel,
  BaptismSchema,
  confirmModel,
  ConfirmSchema,
  documentModel,
  DocumentSchema,
  marriageModel,
  MarriageSchema,
  ParentSchema,
  parentsModel,
} from "~/utils/db";
import { normalizeString } from "~/utils/normalize-string";
import {
  GetAdjacentDocumentsSchema,
  GetDocumentsSchema,
  idSchema,
  ParsedDocumentSchema,
  UpdateParsedDocumentSchema,
} from "~/utils/validators";
import type { ServerResult } from "~/utils/validators";

export async function getDocuments(
  input: unknown,
): Promise<ServerResult<TDocument[]>> {
  const { search, selectValue } = await GetDocumentsSchema.parseAsync(input);
  const queriedText = normalizeString(search ?? "");

  const nameRegex = new RegExp(queriedText);
  let queryFilters: object | undefined = undefined;

  if (selectValue === "NOMBRE") {
    queryFilters = { nameE: nameRegex };
  }
  if (selectValue === "APELLIDO") {
    queryFilters = { lastnameE: nameRegex };
  }
  if (selectValue === "FECHAINSCRIPCION") {
    queryFilters = { inscr_Date: nameRegex };
  }
  if (selectValue === "ID") {
    queryFilters = { n_id: nameRegex };
  }

  try {
    const documents = await documentModel
      .find({ ...queryFilters })
      .then((value) =>
        value.map((document) =>
          DocumentSchema.parse({
            ...document.toJSON(),
            _id: document._id.toString(),
            parent_Data: {
              p_id: document.parent_Data?.p_id?.toString() ?? "",
            },
            Bautismo: {
              p_id: document.Bautismo?.b_id?.toString() ?? "",
            },
            Confirmacion: {
              p_id: document.Confirmacion?.c_id?.toString() ?? "",
            },
            Matrimonio: {
              p_id: document.Matrimonio?.m_id?.toString() ?? "",
            },
          }),
        ),
      );

    return { success: true, data: documents };
  } catch {
    return { success: false, msg: "failed to query database" };
  }
}

export async function getDocument(
  input: unknown,
): Promise<ServerResult<TDocument>> {
  const { _id: documentId } = await idSchema.parseAsync(input);

  try {
    const document = await documentModel.findOne({ _id: documentId });
    if (!document) return { success: false, msg: "document does not exist" };

    return {
      success: true,
      data: DocumentSchema.parse({
        ...document.toJSON(),
        _id: document._id.toString(),
        parent_Data: {
          p_id: document.parent_Data?.p_id?.toString() ?? "",
        },
        Bautismo: {
          p_id: document.Bautismo?.b_id?.toString() ?? "",
        },
        Confirmacion: {
          p_id: document.Confirmacion?.c_id?.toString() ?? "",
        },
        Matrimonio: {
          p_id: document.Matrimonio?.m_id?.toString() ?? "",
        },
      }),
    };
  } catch {
    return { success: false, msg: "failed to query database" };
  }
}

export async function getAdjacentDocuments(input: unknown): Promise<
  ServerResult<{
    Bautismo: TBaptism;
    Matrimonio: TMarriage | undefined;
    Confirmacion: TConfirm | undefined;
    parent_Data: TParent | undefined;
  }>
> {
  const { b_id, c_id, m_id, p_id } =
    await GetAdjacentDocumentsSchema.parseAsync(input);

  let Data_bautismo: TBaptism | undefined = undefined;
  let Data_confirmacion: TConfirm | undefined = undefined;
  let Data_matrimonio: TMarriage | undefined = undefined;
  let Data_parents: TParent | undefined = undefined;

  Data_bautismo = await baptismModel
    .findById(b_id)
    .then((value) =>
      BaptismSchema.parse({ ...value?.toJSON(), _id: value?._id.toString() }),
    );
  if (!Data_bautismo) return { success: false, msg: "document does not exist" };

  if (c_id && c_id !== "") {
    Data_confirmacion = await confirmModel.findById(c_id).then((value) =>
      value
        ? ConfirmSchema.parse({
            ...value.toJSON(),
            _id: value._id.toString(),
          })
        : undefined,
    );
  }
  if (m_id && m_id !== "") {
    Data_matrimonio = await marriageModel.findById(m_id).then((value) =>
      value
        ? MarriageSchema.parse({
            ...value.toJSON(),
            _id: value._id.toString(),
          })
        : undefined,
    );
  }
  if (p_id && p_id !== "") {
    Data_parents = await parentsModel.findById(p_id).then((value) =>
      value
        ? ParentSchema.parse({
            ...value.toJSON(),
            _id: value._id.toString(),
          })
        : undefined,
    );
  }

  return {
    success: true,
    data: {
      Bautismo: Data_bautismo,
      Matrimonio: Data_matrimonio,
      Confirmacion: Data_confirmacion,
      parent_Data: Data_parents,
    },
  };
}

export async function addDocument(input: unknown): Promise<
  ServerResult<{
    status: true;
  }>
> {
  const newDocument = await ParsedDocumentSchema.parseAsync(input);
  if (
    newDocument.Documento.name.length !== 0 &&
    newDocument.Documento.lastname.length !== 0
  ) {
    const existingDocument = await documentModel.findOne({
      nameE: normalizeString(newDocument.Documento.name),
      lastnameE: normalizeString(newDocument.Documento.lastname),
      rut: newDocument.Documento.rut,
    });

    if (existingDocument) {
      return { success: false, msg: "document already exists" };
    }

    let p_parent_data: TParent | undefined = undefined;
    let d_bautismo_data: TBaptism | undefined = undefined;
    let d_confirmacion_data: TConfirm | undefined = undefined;
    let d_matrimonio_data: TMarriage | undefined = undefined;

    if (newDocument.A_parent) {
      const p_parent = new parentsModel(newDocument.parent_Data);
      p_parent_data = await p_parent
        .save()
        .then((value) =>
          ParentSchema.parse({ ...value.toJSON(), _id: value._id.toString() }),
        );
    }
    if (newDocument.A_bautismo) {
      const d_bautismo = new baptismModel(newDocument.Bautismo);
      d_bautismo_data = await d_bautismo
        .save()
        .then((value) =>
          BaptismSchema.parse({ ...value.toJSON(), _id: value._id.toString() }),
        );
    }
    if (newDocument.A_confirmacion) {
      const d_confirmacion = new confirmModel(newDocument.Confirmacion);
      d_confirmacion_data = await d_confirmacion
        .save()
        .then((value) =>
          ConfirmSchema.parse({ ...value.toJSON(), _id: value._id.toString() }),
        );
    }
    if (newDocument.A_matrimonio) {
      const d_matrimonio = new marriageModel(newDocument.Matrimonio);
      d_matrimonio_data = await d_matrimonio
        .save()
        .then((value) =>
          MarriageSchema.parse({
            ...value.toJSON(),
            _id: value._id.toString(),
          }),
        );
    }

    const datos = {
      ...newDocument.Documento,
      inscr_Date: newDocument.Bautismo.b_date,
      nameE: normalizeString(newDocument.Documento.name),
      lastnameE: normalizeString(newDocument.Documento.lastname),
      parent_Data: {
        p_id: p_parent_data ? p_parent_data._id.toString() : "",
      },
      Bautismo: {
        b_id: d_bautismo_data ? d_bautismo_data._id.toString() : "",
      },
      Confirmacion: {
        c_id: d_confirmacion_data ? d_confirmacion_data._id.toString() : "",
      },
      Matrimonio: {
        m_id: d_matrimonio_data ? d_matrimonio_data._id.toString() : "",
      },
    };

    const documento = new documentModel(datos);
    await documento.save();

    return { success: true, data: { status: true } };
  } else {
    return { success: false, msg: "name and lastname cant be blank" };
  }
}

export async function editDocument(input: unknown): Promise<
  ServerResult<{
    status: true;
  }>
> {
  const updatedDocument = await UpdateParsedDocumentSchema.parseAsync(input);

  let p_parent_data: TParent | undefined = undefined;
  let d_bautismo_data: TBaptism | undefined = undefined;
  let d_confirmacion_data: TConfirm | undefined = undefined;
  let d_matrimonio_data: TMarriage | undefined = undefined;

  const existingDocument = await documentModel.findById(
    updatedDocument.Documento._id,
  );
  if (!existingDocument)
    return { success: false, msg: "document does not exist" };

  if (
    updatedDocument.Documento.name.length !== 0 &&
    updatedDocument.Documento.lastname.length !== 0
  ) {
    if (updatedDocument.Documento.parent_Data.p_id !== "") {
      const findParents = await parentsModel.findById(
        updatedDocument.Documento.parent_Data.p_id,
      );
      if (!findParents)
        return { success: false, msg: "failed to find parents" };

      await findParents.updateOne(updatedDocument.parent_Data);
    } else {
      if (updatedDocument.A_parent) {
        const p_parent = new parentsModel(updatedDocument.parent_Data);
        p_parent_data = await p_parent
          .save()
          .then((value) =>
            ParentSchema.parse({
              ...value.toJSON(),
              _id: value._id.toString(),
            }),
          );
      }
    }
    if (updatedDocument.Documento.Bautismo.b_id !== "") {
      const findBautismo = await baptismModel.findById(
        updatedDocument.Documento.Bautismo.b_id,
      );
      if (!findBautismo)
        return { success: false, msg: "failed to find baptism" };

      await findBautismo.updateOne(updatedDocument.Bautismo);
    } else {
      if (updatedDocument.A_bautismo) {
        const d_bautismo = new baptismModel(updatedDocument.Bautismo);
        d_bautismo_data = await d_bautismo.save().then((value) =>
          BaptismSchema.parse({
            ...value.toJSON(),
            _id: value._id.toString(),
          }),
        );
      }
    }
    if (updatedDocument.Documento.Confirmacion.c_id !== "") {
      const findConfirmacion = await confirmModel.findById(
        updatedDocument.Documento.Confirmacion.c_id,
      );
      if (!findConfirmacion)
        return { success: false, msg: "failed to find confirm" };

      await findConfirmacion.updateOne(updatedDocument.Confirmacion);
    } else {
      if (updatedDocument.A_confirmacion) {
        const d_confirmacion = new confirmModel(updatedDocument.Confirmacion);
        d_confirmacion_data = await d_confirmacion.save().then((value) =>
          ConfirmSchema.parse({
            ...value.toJSON(),
            _id: value._id.toString(),
          }),
        );
      }
    }
    if (updatedDocument.Documento.Matrimonio.m_id !== "") {
      const findMatrimonio = await marriageModel.findById(
        updatedDocument.Documento.Matrimonio.m_id,
      );
      if (!findMatrimonio)
        return { success: false, msg: "failed to find marriage" };

      await findMatrimonio.updateOne(updatedDocument.Matrimonio);
    } else {
      if (updatedDocument.A_matrimonio) {
        const d_matrimonio = new marriageModel(updatedDocument.Matrimonio);
        d_matrimonio_data = await d_matrimonio.save().then((value) =>
          MarriageSchema.parse({
            ...value.toJSON(),
            _id: value._id.toString(),
          }),
        );
      }
    }

    const datos = {
      ...updatedDocument.Documento,
      inscr_Date: updatedDocument.Bautismo.b_date,
      nameE: normalizeString(updatedDocument.Documento.name),
      lastnameE: normalizeString(updatedDocument.Documento.lastname),
      parent_Data: {
        p_id: p_parent_data?._id ?? existingDocument.parent_Data?.p_id ?? "",
      },
      Bautismo: {
        b_id: d_bautismo_data?._id ?? existingDocument.Bautismo?.b_id ?? "",
      },
      Confirmacion: {
        c_id:
          d_confirmacion_data?._id ?? existingDocument.Confirmacion?.c_id ?? "",
      },
      Matrimonio: {
        m_id: d_matrimonio_data?._id ?? existingDocument.Matrimonio?.m_id ?? "",
      },
    };

    await existingDocument.updateOne(datos);
    return { success: true, data: { status: true } };
  } else {
    return { success: false, msg: "name and lastname cant be blank" };
  }
}

export async function deleteDocument(input: unknown): Promise<
  ServerResult<{
    status: true;
  }>
> {
  const { _id: documentId } = await idSchema.parseAsync(input);

  const existingDocument = await documentModel.findById(documentId);
  if (!existingDocument)
    return { success: false, msg: "document does not exist" };

  try {
    if (
      existingDocument.parent_Data &&
      existingDocument.parent_Data.p_id !== ""
    ) {
      await parentsModel.deleteOne({ _id: existingDocument.parent_Data.p_id });
    }
    if (existingDocument.Bautismo && existingDocument.Bautismo.b_id !== "") {
      await baptismModel.deleteOne({ _id: existingDocument.Bautismo.b_id });
    }
    if (
      existingDocument.Confirmacion &&
      existingDocument.Confirmacion.c_id !== ""
    ) {
      await confirmModel.deleteOne({ _id: existingDocument.Confirmacion.c_id });
    }
    if (
      existingDocument.Matrimonio &&
      existingDocument.Matrimonio.m_id !== ""
    ) {
      await marriageModel.deleteOne({ _id: existingDocument.Matrimonio.m_id });
    }
    await documentModel.deleteOne({ _id: existingDocument._id });

    return { success: true, data: { status: true } };
  } catch (error) {
    console.error(error);
    return { success: false, msg: "failed to delete document from database" };
  }
}
