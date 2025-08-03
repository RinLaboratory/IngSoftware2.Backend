/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";

import * as usersController from "../controllers/users";
import { checkAdminMiddleware, checkUserMiddleware } from "~/middlewares/auth";

const usersRouter = Router();

usersRouter.use(checkUserMiddleware());

usersRouter.get("/current", usersController.getCurrentUser);
usersRouter.get("/", usersController.getUsers);

usersRouter.use(checkAdminMiddleware());

usersRouter.put("/", usersController.editUser);
usersRouter.delete("/:id", usersController.deleteUser);

export default usersRouter;
