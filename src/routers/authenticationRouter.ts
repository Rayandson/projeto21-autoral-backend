import { validateBody } from "../middlewares/validationMiddleware";
import { Router } from "express";
import { signIn } from "../controllers";
import { signInSchema } from "../schemas/authenticationSchema";

const authenticationRouter = Router();

authenticationRouter.post("/signin", validateBody(signInSchema), signIn);

export { authenticationRouter };
