import { User } from "@prisma/client";

export type UserParams = Omit<User, "id" | "googleId" | "createdAt" | "updatedAt">;