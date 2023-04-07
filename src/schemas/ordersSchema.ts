import { OrderBody } from "../protocols/ordersProtocols";
import joi from "joi";

export const ordersSchema = joi.object<OrderBody>({
  orderInfo: joi.object({
    userName: joi.string(),
    userCpf: joi.string().min(11).max(11),
    total: joi.number().required(),
    status: joi.string().required(),
    userId: joi.number(),
    restaurantId: joi.number().required(),
    tableId: joi.number().required(),
  }),
  items: joi.array().items(
    joi.object({
      itemName: joi.string().required(),
      price: joi.number(),
      image: joi.string(),
      description: joi.string().required(),
      type: joi.string().required(),
      isHasSubItems: joi.boolean().required(),
      restaurantId: joi.number().required(),
      categoryId: joi.number().required(),
    }),
  ),
});
