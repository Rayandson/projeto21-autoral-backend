import { UserParams } from "../protocols/usersProtocols";
import joi from "joi";

export const usersSchema = joi.object<UserParams>({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  cpf: joi.string().min(11).max(11).required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
});
