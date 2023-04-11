// import usersService from "@/services/usersService";
import usersService from "../services/usersService/index";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function postUser(req: Request, res: Response) {
  const user = req.body;

  try {
    const createdUser = await usersService.createUser(user);

    return res.status(httpStatus.CREATED).send(createdUser);
  } catch (err) {
    if (err.name === "InvalidDataError") {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    } else {
      return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
