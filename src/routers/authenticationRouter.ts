import { validateBody } from "../middlewares/validationMiddleware";
import { Router } from "express";
import { signIn } from "../controllers";
import { signInSchema } from "../schemas/authenticationSchema";
import { authenticateToken } from "../middlewares/authenticationMiddleware";

const authenticationRouter = Router();

authenticationRouter.post("/signin", authenticateToken, validateBody(signInSchema), signIn);

export { authenticationRouter };
