import { Restaurant } from "@prisma/client";

export type RestaurantParams = Omit<Restaurant, "id" | "rating" | "createdAt" | "updatedAt">;
