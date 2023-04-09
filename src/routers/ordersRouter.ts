import { validateBody } from "../middlewares/validationMiddleware";
import { getOrder, postOrder } from "../controllers/ordersController";
import { Router } from "express";
import { ordersSchema } from "../schemas/ordersSchema";

const ordersRouter = Router();

ordersRouter
  .post("/", validateBody(ordersSchema), postOrder)
  .get("/:id", getOrder);

export { ordersRouter };
