// import { prisma } from "@/config";
// import { RestaurantParams } from "@/protocols/restaurantsProtocols";
import { prisma } from "../../config";
import { RestaurantParams } from "../../protocols/restaurantsProtocols";

function createRestaurant(restaurantParams: RestaurantParams) {
    return prisma.restaurant.create({
        data: {
            ...restaurantParams
        }
    })
}

function findRestaurants() {
    return prisma.restaurant.findMany({
        include: {
            Restaurant_restaurantCategory: {
                select: {
                    RestaurantCategory: true
                }
            }
        }
    });
}

function findRestaurantByProfileName(profileName: string) {
    return prisma.restaurant.findFirst({
        where: {
            profileName
        },
        include: {
            Address: true,
            ItemCategory: {
                include: {
                    MenuItem: {
                        include: {
                            SubItem: true
                        }
                    }
                }
            }
        }
    })
}

function createCategory(name: string, image: string) {
    return prisma.restaurantCategory.create({
        data: {
            name,
            image
        }
    })
}

function addCategory(restaurantId: number, restaurantCategoryId: number) {
    return prisma.restaurant_restaurantCategory.create({
        data: {
            restaurantId,
            restaurantCategoryId
        }
    })
}

const restaurantsRepository = {
    createRestaurant,
    findRestaurants,
    findRestaurantByProfileName,
    createCategory,
    addCategory
}

export default restaurantsRepository;