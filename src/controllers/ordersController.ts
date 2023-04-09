import ordersService from "../services/ordersService";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function postOrder(req: Request, res: Response) {
  const { orderInfo, items } = req.body;
  try {
    const order = await ordersService.createOrder(orderInfo);
    const orderItems = await ordersService.createOrderItems(items, order.id);

    res.status(httpStatus.CREATED).send({ order, orderItems });
  } catch (err) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getOrder(req: Request, res: Response) {
  const id = Number(req.params.id);

  try {
    const order = await ordersService.findOrder(id);

    res.status(httpStatus.OK).send(order);
  } catch (err) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
