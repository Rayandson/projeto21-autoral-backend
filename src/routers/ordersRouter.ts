import { validateBody } from "../middlewares/validationMiddleware";
import postOrder from "../controllers/ordersController";
import { Router } from "express";
import { ordersSchema } from "../schemas/ordersSchema";

const ordersRouter = Router();

ordersRouter
  .post("/", validateBody(ordersSchema), postOrder);

export { ordersRouter };
