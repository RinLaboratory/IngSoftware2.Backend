import { env } from "./env";
import { createExpressApp } from "./server";

const { server } = await createExpressApp();

console.log("app is online at port " + env.SERVER_PORT);
server.listen(env.SERVER_PORT);
