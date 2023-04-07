import ordersService from "../services/ordersService";
import { Request, Response } from "express";
import httpStatus from "http-status";

export default async function postOrder(req: Request, res: Response) {
  const { orderInfo, items } = req.body;
  try {
    const response = await ordersService.createOrder(orderInfo);

    res.status(httpStatus.CREATED).send(response);
  } catch (err) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
