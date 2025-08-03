/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";

import * as authController from "../controllers/auth";
import { checkAdminMiddleware, checkUserMiddleware } from "~/middlewares/auth";

const authRouter = Router();

authRouter.post("/login", authController.login);

authRouter.use(checkUserMiddleware());

// admin
authRouter.use(checkAdminMiddleware());
authRouter.post("/register", authController.register);

export default authRouter;
