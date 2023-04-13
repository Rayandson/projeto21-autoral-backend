import { User } from "@prisma/client";

export type SignInParams = Pick<User, "email" | "password">;

export type SignInResult = {
  user: Omit<User, "googleId" | "createdAt" | "updatedAt">;
  token: string;
};
