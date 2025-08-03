import type { NextFunction, Request, Response } from "express";

import * as authMethod from "../methods/auth";

export async function login(req: Request, res: Response, _next: NextFunction) {
  const response = await authMethod.login({
    ...req.body,
  });
  if (response.success) {
    const { token, cookieOptions } = response.data;
    res.cookie("jwt", token, cookieOptions);
    return res.status(200).json({
      token,
    });
  } else {
    res.status(500).json({ error: response.msg });
  }
}

export async function register(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const response = await authMethod.register({
    ...req.body,
  });
  if (response.success) {
    return res.status(200).json(response.data);
  } else {
    res.status(500).json({ error: response.msg });
  }
}
