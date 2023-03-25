import { postUser } from "@/controllers";
import Router from "express";

const usersRouter = Router();

usersRouter
    .post("/", postUser);

export { usersRouter };
