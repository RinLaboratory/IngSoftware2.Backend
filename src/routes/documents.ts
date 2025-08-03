/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";

import * as documentsController from "../controllers/documents";
import { checkAdminMiddleware, checkUserMiddleware } from "~/middlewares/auth";

const documentsRouter = Router();

documentsRouter.use(checkUserMiddleware());

documentsRouter.get("/", documentsController.getDocuments);
documentsRouter.get("/:id", documentsController.getDocument);
documentsRouter.get("/adjacent", documentsController.getAdjacentDocuments);
documentsRouter.post("/", documentsController.addDocument);
documentsRouter.put("/", documentsController.editDocument);

// admin
documentsRouter.use(checkAdminMiddleware());
documentsRouter.delete("/:id", documentsController.deleteDocument);

export default documentsRouter;
