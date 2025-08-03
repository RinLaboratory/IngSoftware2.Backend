import type { TSafeUser } from "~/utils/db";
import { InsertUserSchema, UserSchema, usersModel } from "~/utils/db";
import { passwordsModel } from "~/utils/db/passwords";
import type { ServerResult } from "~/utils/validators";
import { loginSchema } from "~/utils/validators";
import bcrypt from "bcrypt";
import { JsonWebTokenSign } from "~/utils/sign-jwt";
import { env } from "~/env";
import { normalizeString } from "~/utils/normalize-string";

const saltRounds = env.HOW_MANY_HASHES;

export async function login(input: unknown): Promise<
  ServerResult<{
    token: string;
    cookieOptions: { expires: Date; httpOnly: boolean };
  }>
> {
  const loginData = await loginSchema.parseAsync(input);
  let validation = false;

  // buscamos los usuarios que coincidan con el correo colocado
  const user = await usersModel.findOne({ email: loginData.email });
  if (!user) {
    return { success: false, msg: "invalid credentials" };
  }

  const userData = await UserSchema.parseAsync({
    ...user.toJSON(),
    _id: user._id.toString(),
  });

  const pass = await passwordsModel.findById(userData.password_id);

  if (!pass?.password) {
    return { success: false, msg: "invalid credentials" };
  }

  validation = await bcrypt.compare(loginData.password, pass.password);

  if (validation) {
    try {
      const token = await JsonWebTokenSign(
        userData._id.toString(),
        userData.email,
        userData.rol,
      );

      const cookieOptions = {
        expires: new Date(
          Date.now() + env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
        ),
        httpOnly: true,
      };

      return { success: true, data: { token, cookieOptions } };
    } catch (err) {
      console.warn(err);
      return { success: false, msg: "Web Server Error" };
    }
  } else {
    return { success: false, msg: "invalid credentials" };
  }
}

export async function register(input: unknown): Promise<
  ServerResult<{
    status: true;
  }>
> {
  const userData = await InsertUserSchema.parseAsync(input);

  if (userData.rol === "*") {
    return {
      success: false,
      msg: "cant give that rol",
    };
  }

  const user = await usersModel.findOne({ email: userData.email });
  if (!user) {
    return { success: false, msg: "email already exists" };
  }

  const insertedUser: TSafeUser[] = [];

  bcrypt.hash(userData.password, saltRounds, async function (err, hash) {
    const pass = new passwordsModel({ password: hash });
    await pass.save();

    const b_nombre = normalizeString(userData.name);
    const b_apellido = normalizeString(userData.lastname);

    const hashedUserPassword = {
      name: userData.name,
      nameE: b_nombre,
      lastname: userData.lastname,
      lastnameE: b_apellido,
      rol: userData.rol,
      phone: userData.phone,
      email: userData.email,
      password_id: pass._id.toString(),
      lastSeen: undefined,
    };

    const user = await new usersModel(hashedUserPassword).save();
    await user.save();

    insertedUser.push(
      await UserSchema.parseAsync({
        ...user.toJSON(),
        _id: user._id.toString(),
      }),
    );
  });
  if (!insertedUser[0]) {
    return { success: false, msg: "failed to insert user into database" };
  }

  return {
    success: true,
    data: {
      status: true,
    },
  };
}
