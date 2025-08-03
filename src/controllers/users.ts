import type { NextFunction, Request, Response } from "express";

import * as usersMethod from "../methods/users";

export async function getCurrentUser(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const response = await usersMethod.getCurrentUser({ _id: req.user?.id });
  if (response.success) {
    return res.status(200).json(response.data);
  } else {
    res.status(500).json({ error: response.msg });
  }
}

export async function getUsers(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const response = await usersMethod.getUsers({ ...req.query });
  if (response.success) {
    return res.status(200).json(response.data);
  } else {
    res.status(500).json({ error: response.msg });
  }
}

export async function editUser(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const response = await usersMethod.editUser({ ...req.body });
  if (response.success) {
    return res.status(200).json(response.data);
  } else {
    res.status(500).json({ error: response.msg });
  }
}

export async function deleteUser(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const response = await usersMethod.deleteUser(
    { ...req.query },
    { _id: req.user?.id },
  );
  if (response.success) {
    return res.status(200).json(response.data);
  } else {
    res.status(500).json({ error: response.msg });
  }
}
