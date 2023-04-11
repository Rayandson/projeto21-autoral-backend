// import { postUser } from "@/controllers";
import { validateBody } from "../middlewares/validationMiddleware";
import { postUser } from "../controllers/usersController";
import Router from "express";
import { usersSchema } from "../schemas/usersSchema";

const usersRouter = Router();

usersRouter
  .post("/", validateBody(usersSchema), postUser);

export { usersRouter };
