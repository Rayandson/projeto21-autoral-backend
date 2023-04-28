// import restaurantsService from "@/services/restaurantsService";
import restaurantsService from "../services/restaurantsService/index";
import { Request, Response } from "express";
import httpStatus, { INTERNAL_SERVER_ERROR } from "http-status";
// import itemsService from "@/services/itemsService";
import itemsService from "../services/itemsService";

export async function postRestaurant(req: Request, res: Response) {
  const restaurant = req.body;

  try {
    const response = await restaurantsService.createRestaurant(restaurant);

    res.status(httpStatus.CREATED).send(response);
  } catch (err) {
    console.log(err);
    if (err.name === "InvalidDataError") {
      res.sendStatus(httpStatus.BAD_REQUEST);
    } else {
      res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

export async function getRestaurants(req: Request, res: Response) {
  try {
    const restaurants = await restaurantsService.findRestaurants();

    res.status(httpStatus.OK).send(restaurants);
  } catch (err) {
    console.log(err);
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}

export async function getRestaurantByProfileName(req: Request, res: Response) {
  const { profileName } = req.params;
  try {
    const restaurantInfo = await restaurantsService.findRestaurantByProfileName(profileName);
    const mostOrdered = await itemsService.findMostOrderedItems(restaurantInfo.id);

    return res.status(httpStatus.OK).send({ restaurantInfo, mostOrdered });
  } catch (err) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function postCategory(req: Request, res: Response) {
  const { name, image } = req.body;
  try {
    const category = await restaurantsService.createCategory(name, image);

    return res.status(httpStatus.CREATED).send(category);
  } catch (err) {
    return res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}

export async function addCategory(req: Request, res: Response) {
  const { restaurantId, restaurantCategoryId } = req.body;
  try {
    await restaurantsService.addCategory(restaurantId, restaurantCategoryId);

    return res.sendStatus(httpStatus.CREATED);
  } catch (err) {
    return res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}
