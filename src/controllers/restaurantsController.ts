import restaurantsService from "@/services/restaurantsService";
import { Request, Response } from "express";
import httpStatus, { INTERNAL_SERVER_ERROR } from "http-status";

export async function postRestaurant(req: Request, res: Response) {
    const restaurant = req.body;

    try {
        const response = await restaurantsService.createRestaurant(restaurant);

        res.status(httpStatus.CREATED).send(response)
    } catch(err) {
        console.log(err)
        if(err.name === "InvalidDataError") {
            res.sendStatus(httpStatus.BAD_REQUEST)
        } else {
            res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
        }
    }  
}

export async function getRestaurants(req: Request, res: Response) {
    try {
        const restaurants = await restaurantsService.findRestaurants();

        res.status(httpStatus.OK).send(restaurants);
    } catch(err) {
        res.sendStatus(INTERNAL_SERVER_ERROR);
    }
}

export async function postCategory(req: Request, res: Response) {
    const {name, image} = req.body;
    try {
        const category = await restaurantsService.createCategory(name, image);

        res.status(httpStatus.CREATED).send(category);
    } catch(err) {
        res.sendStatus(INTERNAL_SERVER_ERROR);
    }
}

export async function addCategory(req: Request, res: Response) {
    const {restaurantId, restaurantCategoryId} = req.body;
    try {
        await restaurantsService.addCategory(restaurantId, restaurantCategoryId);

        res.sendStatus(httpStatus.CREATED);
    } catch(err) {
        res.sendStatus(INTERNAL_SERVER_ERROR);
    }
}