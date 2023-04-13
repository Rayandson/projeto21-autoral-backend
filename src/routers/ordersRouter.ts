import { validateBody } from "../middlewares/validationMiddleware";
import { getOrder, getOrdersByUserId, postOrder } from "../controllers/ordersController";
import { Router } from "express";
import { ordersSchema } from "../schemas/ordersSchema";

const ordersRouter = Router();

ordersRouter
  .post("/", validateBody(ordersSchema), postOrder)
  .get("/:id", getOrder)
  .get("/history", getOrdersByUserId);

export { ordersRouter };
