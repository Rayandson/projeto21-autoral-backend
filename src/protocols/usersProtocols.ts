import { User } from "@prisma/client";

export type userParams = Omit<User, "id" | "googleId" | "createdAt" | "updatedAt">;