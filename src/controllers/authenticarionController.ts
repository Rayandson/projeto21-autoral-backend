import authenticationService from "../services/authentication-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function signIn(req: Request, res: Response) {
  const signInParams = req.body;

  try {
    const userData = await authenticationService.signIn(signInParams);

    return res.status(httpStatus.OK).send(userData);
  } catch (err) {
    if (err.name === "InvalidCredentialsError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    } else {
      console.log(err);
      return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
