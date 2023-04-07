import { MenuItem, Order } from "@prisma/client";

export type OrderParams = Omit<Order, "id" | "createdAt" | "updatedAt">;

export type OrderBody = {
    orderInfo: Omit<Order, "id" | "createdAt" | "updatedAt">;
    items: Omit<MenuItem, "id" | "rating" | "orderCount">;
}
