import { Order } from "@prisma/client";
import { OrderParams } from "../../protocols/ordersProtocols";
import ordersRepository from "../../repositories/ordersRepository";

async function createOrder(orderParams: OrderParams) {
  const order = await ordersRepository.createOrder(orderParams);

  return order;
}

async function createOrderItems(items: OrderItems, orderId: number) {
  const orderItems = items.map((i) => {
    return { ...i, orderId };
  });

  await ordersRepository.createOrderItems(orderItems);
  return orderItems;
}

async function findOrder(orderId: number): Promise<Order> {
  const order = await ordersRepository.findOrder(orderId);
  
  return order;
}

type OrderItems = {
  itemId: number;
  quantity: number;
}[];

const ordersService = {
  createOrder,
  createOrderItems,
  findOrder
};

export default ordersService;
