import type { NextFunction, Request, Response } from "express";

import * as miscellaneousMethod from "../methods/miscellaneous";

export async function getNotifications(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const response = await miscellaneousMethod.getNotifications();
  if (response.success) {
    return res.status(200).json(response.data);
  } else {
    res.status(500).json({ error: response.msg });
  }
}
