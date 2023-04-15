import { OrderParams } from "../../protocols/ordersProtocols";
import { prisma } from "../../config";

function createOrder(orderParams: OrderParams) {
  return prisma.order.create({
    data: orderParams,
  });
}

function createOrderItems(items: OrderItems) {
  return prisma.menuItem_Order.createMany({
    data: items,
  });
}

function findOrder(orderId: number) {
  return prisma.order.findFirst({
    where: {
      id: orderId,
    },
    include: {
      MenuItem_Order: {
        include: {
          MenuItem: true,
        },
      },
    },
  });
}

function findOrdersByUserId(userId: number) {
  return prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      Restaurant: true,
    }
  });
}

type OrderItems = {
  itemId: number;
  orderId: number;
  quantity: number;
}[];

const ordersRepository = {
  createOrder,
  createOrderItems,
  findOrder,
  findOrdersByUserId
};

export default ordersRepository;
