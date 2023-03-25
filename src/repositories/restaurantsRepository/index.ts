import { prisma } from "@/config";
import { RestaurantParams } from "@/protocols/restaurantsProtocols";

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
    createCategory,
    addCategory
}

export default restaurantsRepository;