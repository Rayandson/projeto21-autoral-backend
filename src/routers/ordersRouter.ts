import { validateBody } from "../middlewares/validationMiddleware";
import { getOrder, getOrdersByUserId, postOrder } from "../controllers/ordersController";
import { Router } from "express";
import { ordersSchema } from "../schemas/ordersSchema";
import { authenticateToken } from "../middlewares/authenticationMiddleware";

const ordersRouter = Router();

ordersRouter
  .post("/", validateBody(ordersSchema), postOrder)
  .get("/:id", getOrder)
  .get("/history", authenticateToken, getOrdersByUserId);

export { ordersRouter };
