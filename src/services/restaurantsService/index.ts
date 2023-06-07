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
      profileName: r.profileName,
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
          image: c.RestaurantCategory.image,
        };
      }),
    };
  });
  return restaurants;
}

async function findRestaurantByProfileName(profileName: string) {
  const response = await restaurantsRepository.findRestaurantByProfileName(profileName);

  const restaurantInfo = {
    id: response.id,
    name: response.name,
    profileName: response.profileName,
    picture: response.picture,
    cover: response.cover,
    cnpj: response.cnpj,
    rating: response.rating,
    themeColor: response.themeColor,
    fontColor: response.fontColor,
    address: response.Address,
    itemCategories: response.ItemCategory.map((c) => {
      return {
        id: c.id,
        name: c.name,
        items: c.MenuItem,
      };
    }),
    tables: response.Restaurant_Table.map((t) => {
      return { id: t.Table.id, number: t.Table.number };
    }),
  };
  return restaurantInfo;
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
  findRestaurantByProfileName,
  createCategory,
  addCategory,
};

export default restaurantsService;
