// import { postUser } from "@/controllers";
import { postUser } from "../controllers/usersController";
import Router from "express";

const usersRouter = Router();

usersRouter
  .post("/", postUser);

export { usersRouter };
