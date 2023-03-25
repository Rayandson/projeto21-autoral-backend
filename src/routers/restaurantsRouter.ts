import { addCategory, getRestaurants, postCategory, postRestaurant } from "@/controllers";
import { Router } from "express";

const restaurantsRouter = Router();

restaurantsRouter
    .post("/", postRestaurant)
    .get("/", getRestaurants)
    .post("/category", postCategory)
    .post("/category/relate", addCategory)

export { restaurantsRouter };