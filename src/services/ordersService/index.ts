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

type OrderItems = {
  itemId: number;
  quantity: number;
}[];

const ordersService = {
  createOrder,
  createOrderItems
};

export default ordersService;
