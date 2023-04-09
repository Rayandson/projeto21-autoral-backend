import { OrderParams } from "../../protocols/ordersProtocols";
import { prisma } from "../../config";

function createOrder(orderParams: OrderParams) {
  return prisma.order.create({
    data: orderParams,
  });
}

function createOrderItems(items: OrderItems) {
  return prisma.menuItem_Order.createMany({
    data: items
  });
}

type OrderItems = {
  itemId: number;
  orderId: number;
  quantity: number;
}[];

const ordersRepository = {
  createOrder,
  createOrderItems
};

export default ordersRepository;
