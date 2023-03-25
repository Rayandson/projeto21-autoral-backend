/*
  Warnings:

  - You are about to drop the `_RestaurantToRestaurantCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_RestaurantToRestaurantCategory" DROP CONSTRAINT "_RestaurantToRestaurantCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_RestaurantToRestaurantCategory" DROP CONSTRAINT "_RestaurantToRestaurantCategory_B_fkey";

-- DropTable
DROP TABLE "_RestaurantToRestaurantCategory";

-- CreateTable
CREATE TABLE "restaurant_restaurantCategory" (
    "id" SERIAL NOT NULL,
    "restaurantId" INTEGER NOT NULL,
    "RestaurantCategoryId" INTEGER NOT NULL,

    CONSTRAINT "restaurant_restaurantCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_restaurantCategory_restaurantId_key" ON "restaurant_restaurantCategory"("restaurantId");

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_restaurantCategory_RestaurantCategoryId_key" ON "restaurant_restaurantCategory"("RestaurantCategoryId");

-- AddForeignKey
ALTER TABLE "restaurant_restaurantCategory" ADD CONSTRAINT "restaurant_restaurantCategory_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurant_restaurantCategory" ADD CONSTRAINT "restaurant_restaurantCategory_RestaurantCategoryId_fkey" FOREIGN KEY ("RestaurantCategoryId") REFERENCES "restaurantCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
