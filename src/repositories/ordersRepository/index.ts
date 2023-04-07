import { OrderParams } from "../../protocols/ordersProtocols";
import { prisma } from "../../config";

function createOrder(orderParams: OrderParams) {
  return prisma.order.create({
    data: orderParams,
  });
}

const ordersRepository = {
  createOrder
};

export default ordersRepository;
