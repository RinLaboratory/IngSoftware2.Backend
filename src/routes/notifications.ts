/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";

import * as notificationsController from "../controllers/notifications";
import { checkUserMiddleware } from "~/middlewares/auth";

const notificationsRouter = Router();

notificationsRouter.use(checkUserMiddleware());

notificationsRouter.get("/", notificationsController.getNotifications);

export default notificationsRouter;
