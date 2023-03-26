// import { RestaurantParams } from "@/protocols/restaurantsProtocols";
// import restaurantsRepository from "@/repositories/restaurantsRepository";
import { RestaurantParams } from "../../protocols/restaurantsProtocols";
import restaurantsRepository from "../../repositories/restaurantsRepository";

async function createRestaurant(restaurantParams: RestaurantParams) {
  const restaurant = await restaurantsRepository.createRestaurant(restaurantParams);

  return restaurant;
}

async function findRestaurants() {
  const response = await restaurantsRepository.findRestaurants();
  const restaurants = response.map((r) => {
    return {
      id: r.id,
      name: r.name,
      picture: r.picture,
      cover: r.cover,
      cnpj: r.cnpj,
      rating: r.rating,
      themeColor: r.themeColor,
      fontColor: r.fontColor,
      restaurantCategories: r.Restaurant_restaurantCategory.map((c) => {
        return {
          id: c.RestaurantCategory.id,
          name: c.RestaurantCategory.name,
          image: c.RestaurantCategory.image
        }
      })
    }
  })
  return restaurants;
}

async function createCategory(name: string, image: string) {
  const category = await restaurantsRepository.createCategory(name, image);

  return category;
}

async function addCategory(restaurantId: number, restaurantCategoryId: number) {
  await restaurantsRepository.addCategory(restaurantId, restaurantCategoryId);
}

const restaurantsService = {
  createRestaurant,
  findRestaurants,
  createCategory,
  addCategory
};

export default restaurantsService;
