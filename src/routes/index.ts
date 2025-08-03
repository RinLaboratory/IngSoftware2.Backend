/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import authRouter from "./auth";
import { authenticationMiddleware } from "~/middlewares/auth";
import documentsRouter from "./documents";
import notificationsRouter from "./notifications";
import usersRouter from "./users";

const appRouter = Router();
appRouter.use(authenticationMiddleware);

appRouter.use("/auth", authRouter);
appRouter.use("/documents", documentsRouter);
appRouter.use("/notifications", notificationsRouter);
appRouter.use("/users", usersRouter);

export default appRouter;
