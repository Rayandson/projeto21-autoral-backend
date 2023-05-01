import express, { Express } from "express";
import cors from "cors";
import { loadEnv, connectDb, disconnectDB } from "./config";
import { usersRouter } from "./routers/usersRouter";
import { restaurantsRouter } from "./routers/restaurantsRouter";
import { ordersRouter } from "./routers/ordersRouter";
import { authenticationRouter } from "./routers/authenticationRouter";
// import { loadEnv, connectDb, disconnectDB } from "@/config";
// import { handleApplicationErrors } from "@/middlewares";

loadEnv();

const app = express();
app
  .use(cors())
  .use(express.json())
  .get("/api/health", (_req, res) => res.send("OK!"))
  .use("/api/users", usersRouter)
  .use("/api/restaurants", restaurantsRouter)
  .use("/api/orders", ordersRouter)
  .use("/api/auth", authenticationRouter);
//   .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
