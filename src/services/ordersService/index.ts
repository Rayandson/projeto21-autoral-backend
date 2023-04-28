import { Order, Restaurant } from "@prisma/client";
import { OrderParams } from "../../protocols/ordersProtocols";
import ordersRepository from "../../repositories/ordersRepository";
import itemsRepository from "../../repositories/itemsRepository";

async function createOrder(orderParams: OrderParams) {
  const order = await ordersRepository.createOrder(orderParams);

  return order;
}

async function createOrderItems(items: OrderItems, orderId: number) {
  const orderItems = items.map((i) => {
    return { ...i, orderId };
  });

  await ordersRepository.createOrderItems(orderItems);
  await itemsRepository.updateOrderCount(items);

  return orderItems;
}

async function findOrder(orderId: number): Promise<Order> {
  const response = await ordersRepository.findOrder(orderId);

  const items = response.MenuItem_Order.map((i) => {
    return { quantity: i.quantity, itemInfo: i.MenuItem };
  });

  const order = { ...response, items }; 
  delete order.MenuItem_Order;

  return order;
}

type OrderItems = {
  itemId: number;
  quantity: number;
}[];

async function findOrdersByUserId(userId: number): Promise<(Order & { Restaurant: Restaurant; })[]> {
  const orders = ordersRepository.findOrdersByUserId(userId);

  return orders;
}

const ordersService = {
  createOrder,
  createOrderItems,
  findOrder,
  findOrdersByUserId
};

export default ordersService;
