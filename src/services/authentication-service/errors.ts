import { ApplicationError } from "../../protocols/errorsProtocols";

export function invalidCredentialsError(): ApplicationError {
  return {
    name: "InvalidCredentialsError",
    message: "email or password are incorrect",
  };
}
