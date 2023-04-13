import { SignInParams } from "../protocols/authenticationProtocols";
import joi from "joi";

export const signInSchema = joi.object<SignInParams>({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
