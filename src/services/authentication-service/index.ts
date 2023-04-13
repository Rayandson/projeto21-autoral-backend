import usersRepository from "../../repositories/usersRepository";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { invalidCredentialsError } from "./errors";
import { SignInParams, SignInResult } from "../../protocols/authenticationProtocols";

async function signIn(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;

  const user = await getUserOrFail(email);
  const userId = user.id;

  await validatePasswordOrFail(password, user.password);

  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  delete(user.password);

  return {
    user: user,
    token,
  };
}

async function getUserOrFail(email: string): Promise<GetUserOrFailResult> {
  const user = await usersRepository.findUserByEmail(email);
  if (!user) throw invalidCredentialsError();

  return user;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

type GetUserOrFailResult = Omit<User, "googleId" | "createdAt" | "updatedAt">;

const authenticationService = {
  signIn,
};

export default authenticationService;
