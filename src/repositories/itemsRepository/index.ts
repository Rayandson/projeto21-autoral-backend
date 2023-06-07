import { prisma } from "../../config";

function findMostOrderedItems(id: number) {
  return prisma.menuItem.findMany({
    where: {
      restaurantId: id,
    },
    orderBy: {
      orderCount: "desc",
    },
    take: 5,
  });
}

function findMostOrderedSubItems(id: number) {
  return prisma.subItem.findMany({
    where: {
      restaurantId: id,
    },
    orderBy: {
      orderCount: "desc",
    },
  });
}

async function updateOrderCount(items: { itemId: number; quantity: number }[]) {
  const promises = items.map((item) => {
    return prisma.menuItem.update({
      where: {
        id: item.itemId,
      },
      data: {
        orderCount: {
          increment: item.quantity,
        },
      },
    });
  });
  await Promise.all(promises);
}

const itemsRepository = {
  findMostOrderedItems,
  findMostOrderedSubItems,
  updateOrderCount,
};

export default itemsRepository;
