import { documentModel, usersModel } from "~/utils/db";
import type { ServerResult } from "~/utils/validators";

export async function getNotifications(): Promise<
  ServerResult<{
    documentos: number;
    usuarios: number;
    permisos: number;
  }>
> {
  const cantidad_documentos = await documentModel.countDocuments();
  const cantidad_usuarios = await usersModel.countDocuments();
  const cantidad_usuarios_permisos = await usersModel.countDocuments({
    rol: "SECRETARIA",
  });

  return {
    success: true,
    data: {
      documentos: cantidad_documentos,
      usuarios: cantidad_usuarios,
      permisos: cantidad_usuarios_permisos,
    },
  };
}
