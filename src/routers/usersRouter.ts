// import { postUser } from "@/controllers";
import { validateBody } from "../middlewares/validationMiddleware";
import { postUser } from "../controllers";
import Router from "express";
import { usersSchema } from "../schemas/usersSchema";
import { authenticateToken } from "../middlewares/authenticationMiddleware";
import { getOrdersByUserId } from "../controllers";

const usersRouter = Router();

usersRouter
  .post("/", validateBody(usersSchema), postUser)
  .get("/history", authenticateToken, getOrdersByUserId);

export { usersRouter };
