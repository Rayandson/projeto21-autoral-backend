import { AuthenticatedRequest } from "../middlewares/authenticationMiddleware";
import ordersService from "../services/ordersService";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { OrderBody } from "../protocols/ordersProtocols";

export async function postOrder(req: Request, res: Response) {
  const { orderInfo, items } = req.body as OrderBody;

  try {
    const order = await ordersService.createOrder(orderInfo);
    const orderItems = await ordersService.createOrderItems(items, order.id);

    return res.status(httpStatus.CREATED).send({ order, orderItems });
  } catch (err) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getOrder(req: Request, res: Response) {
  const id = Number(req.params.id);

  try {
    const order = await ordersService.findOrder(id);

    return res.status(httpStatus.OK).send(order);
  } catch (err) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getOrdersByUserId(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const orders = await ordersService.findOrdersByUserId(userId);

    return res.status(httpStatus.OK).send(orders);
  } catch(err) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
