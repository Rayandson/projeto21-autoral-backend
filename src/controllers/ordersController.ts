import ordersService from "../services/ordersService";
import { Request, Response } from "express";
import httpStatus from "http-status";

export default async function postOrder(req: Request, res: Response) {
  const { orderInfo, items } = req.body;
  try {
    const order = await ordersService.createOrder(orderInfo);
    const orderItems = await ordersService.createOrderItems(items, order.id);

    res.status(httpStatus.CREATED).send({ order, orderItems });
  } catch (err) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
