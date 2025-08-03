import { env } from "~/env";
import type { TSafeUser } from "~/utils/db";
import {
  passwordsModel,
  UpdateUserSchema,
  UserSchema,
  usersModel,
} from "~/utils/db";
import { normalizeString } from "~/utils/normalize-string";
import type { ServerResult } from "~/utils/validators";
import { GetUsersSchema, idSchema } from "~/utils/validators";
import bcrypt from "bcrypt";

const saltRounds = env.HOW_MANY_HASHES;

export async function getCurrentUser(
  input: unknown,
): Promise<ServerResult<TSafeUser>> {
  const { _id: userId } = await idSchema.parseAsync(input);

  const user = await usersModel
    .findById(userId)
    .then((value) =>
      value
        ? UserSchema.parse({ ...value.toJSON(), _id: value._id.toString() })
        : undefined,
    );
  if (!user) {
    return { success: false, msg: "user does not exist" };
  }
  return { success: true, data: user };
}

export async function getUsers(
  input: unknown,
): Promise<ServerResult<TSafeUser[]>> {
  const { buscar, search } = await GetUsersSchema.parseAsync(input);
  const texto = normalizeString(buscar ?? "");
  const nameRegex = new RegExp(texto);

  let queryFilters: object | undefined = undefined;

  if (buscar && search !== undefined && search !== "") {
    if (search == "NOMBRE") {
      queryFilters = {
        nameE: { $regex: nameRegex, $options: "i" },
      };
    }
    if (search == "APELLIDO") {
      queryFilters = {
        lastnameE: { $regex: nameRegex, $options: "i" },
      };
    }
    if (search == "CORREO") {
      queryFilters = {
        email: { $regex: nameRegex, $options: "i" },
      };
    }
    if (search == "ID") {
      queryFilters = {
        _id: { $regex: nameRegex, $options: "i" },
      };
    }
  }

  const users = await usersModel
    .find({ ...queryFilters })
    .then((value) =>
      value.map((user) =>
        UserSchema.parse({ ...user.toJSON(), _id: user._id.toString() }),
      ),
    );

  return { success: true, data: users };
}

export async function editUser(
  input: unknown,
): Promise<ServerResult<{ status: true }>> {
  const updatedUser = await UpdateUserSchema.parseAsync(input);

  const user = await usersModel.findOne({ email: updatedUser.email });
  if (!user) {
    return { success: false, msg: "user does not exist" };
  }

  if (updatedUser.rol === "*" && user.rol !== updatedUser.rol) {
    return { success: false, msg: "cant give that rol" };
  }

  if (updatedUser.password && updatedUser.password.length !== 0) {
    bcrypt.hash(updatedUser.password, saltRounds, async function (err, hash) {
      const pass = await passwordsModel.findById(user.password_id);
      if (!pass) {
        return {
          success: false,
          msg: "user has no password which should be impossible",
        };
      }
      await pass.updateOne({ password: hash });
    });
  }
  const datos = {
    name: updatedUser.name,
    nameE: normalizeString(updatedUser.name),
    lastname: updatedUser.lastname,
    lastnameE: normalizeString(updatedUser.lastname),
    email: updatedUser.email,
    rol: updatedUser.rol,
    password_id: user.password_id,
    phone: updatedUser.phone,
    lastSeen: user.lastSeen,
  };

  await user.updateOne(datos);

  return { success: true, data: { status: true } };
}

export async function deleteUser(
  input: unknown,
  currentUser: unknown,
): Promise<ServerResult<{ status: true }>> {
  const { _id: userId } = await idSchema.parseAsync(input);
  const { _id: currentUserId } = await idSchema.parseAsync(currentUser);

  if (userId === currentUserId) {
    return { success: false, msg: "you cant delete yourself" };
  }

  const existingUser = await usersModel.findById(userId);
  if (!existingUser) {
    return { success: false, msg: "this user does not exist" };
  }

  if (existingUser.rol === "*") {
    return { success: false, msg: "cant delete an admin " };
  }

  try {
    await usersModel.deleteOne({ _id: existingUser._id.toString() });
    return { success: true, data: { status: true } };
  } catch {
    return { success: false, msg: "failed to delete user from database" };
  }
}
