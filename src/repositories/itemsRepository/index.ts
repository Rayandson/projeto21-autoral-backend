// import { prisma } from "@/config";
import { prisma } from "../../config";

function findMostOrderedItems(id: number) {
    return prisma.menuItem.findMany({
        where: {
            restaurantId: id
        },
        orderBy: {
            orderCount: "desc"
        },
        take: 5
    })
}

function findMostOrderedSubItems(id: number) {
    return prisma.subItem.findMany({
        where: {
            restaurantId: id
        },
        orderBy: {
            orderCount: "desc"
        }
    })
}

const itemsRepository = {
    findMostOrderedItems,
    findMostOrderedSubItems
}

export default itemsRepository;