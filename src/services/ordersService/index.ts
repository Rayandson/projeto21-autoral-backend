import { OrderParams } from "../../protocols/ordersProtocols";
import ordersRepository from "../../repositories/ordersRepository";

async function createOrder(orderParams: OrderParams) {
  const order = await ordersRepository.createOrder(orderParams);

  return order;
}

const ordersService = {
  createOrder,
};

export default ordersService;
