// import { addCategory, getRestaurants, postCategory, postRestaurant } from "@/controllers";
import { addCategory, getRestaurantByProfileName, getRestaurants, postCategory, postRestaurant } from "../controllers/restaurantsController";
import { Router } from "express";

const restaurantsRouter = Router();

restaurantsRouter
    .post("/", postRestaurant)
    .get("/", getRestaurants)
    .get("/:profileName", getRestaurantByProfileName)
    .post("/category", postCategory)
    .post("/category/relate", addCategory)

export { restaurantsRouter };