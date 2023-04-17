import * as jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { createUser } from "./factories/usersFactory";
import { prisma } from "../src/config";

export async function cleanDb() {
  await prisma.menuItem_Order.deleteMany({});
  await prisma.subItem_Order.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.restaurant_Table.deleteMany({});
  await prisma.table.deleteMany({});
  await prisma.subItem.deleteMany({});
  await prisma.menuItem.deleteMany({});
  await prisma.itemCategory.deleteMany({});
  await prisma.address.deleteMany({});
  await prisma.restaurant_restaurantCategory.deleteMany({});
  await prisma.restaurantCategory.deleteMany({});
  await prisma.restaurant.deleteMany({});
  await prisma.user.deleteMany({});
}

export async function generateValidToken(user?: User) {
  const incomingUser = user || (await createUser());
  const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);

  return token;
}
