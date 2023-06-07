import usersService from "../services/usersService/index";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function postUser(req: Request, res: Response) {
  const user = req.body;

  try {
    await usersService.createUser(user);

    return res.sendStatus(httpStatus.CREATED);
  } catch (err) {
    if (err.name === "InvalidDataError") {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    } else if (err.name === "DuplicatedEmailError") {
      return res.sendStatus(httpStatus.CONFLICT);
    } else {
      return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
