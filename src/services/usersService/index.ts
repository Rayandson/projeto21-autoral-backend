import { UserParams } from "../../protocols/usersProtocols";
import usersRepository from "../../repositories/usersRepository";
import { duplicatedEmailError } from "./errors";
import bcrypt from "bcrypt";

async function createUser(userParams: UserParams) {
  const { email, password } = userParams;

  validateUniqueEmail(email);

  const hashedPassword = await bcrypt.hash(password, 12);
  await usersRepository.createUser({ ...userParams, password: hashedPassword });
}

async function validateUniqueEmail(email: string) {
  const user = await usersRepository.findUserByEmail(email);
  if (user) {
    throw duplicatedEmailError();
  }
}

const usersService = {
  createUser,
};

export default usersService;
