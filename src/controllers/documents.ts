import type { NextFunction, Request, Response } from "express";

import * as documentsMethod from "../methods/documents";

export async function getDocument(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const response = await documentsMethod.getDocument({
    _id: req.params.id,
  });
  if (response.success) {
    return res.status(200).json(response.data);
  } else {
    res.status(500).json({ error: response.msg });
  }
}

export async function getDocuments(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const response = await documentsMethod.getDocuments({
    ...req.query,
  });
  if (response.success) {
    return res.status(200).json(response.data);
  } else {
    res.status(500).json({ error: response.msg });
  }
}

export async function getAdjacentDocuments(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const response = await documentsMethod.getAdjacentDocuments({
    ...req.query,
  });
  if (response.success) {
    return res.status(200).json(response.data);
  } else {
    res.status(500).json({ error: response.msg });
  }
}

export async function addDocument(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const response = await documentsMethod.addDocument({
    ...req.body,
  });
  if (response.success) {
    return res.status(200).json(response.data);
  } else {
    res.status(500).json({ error: response.msg });
  }
}

export async function editDocument(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const response = await documentsMethod.editDocument({
    ...req.body,
  });
  if (response.success) {
    return res.status(200).json(response.data);
  } else {
    res.status(500).json({ error: response.msg });
  }
}

export async function deleteDocument(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const response = await documentsMethod.deleteDocument({
    ...req.body,
  });
  if (response.success) {
    return res.status(200).json(response.data);
  } else {
    res.status(500).json({ error: response.msg });
  }
}
