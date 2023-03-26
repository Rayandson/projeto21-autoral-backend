/*
  Warnings:

  - You are about to drop the column `RestaurantCategoryId` on the `restaurant_restaurantCategory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[restaurantCategoryId]` on the table `restaurant_restaurantCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `restaurantCategoryId` to the `restaurant_restaurantCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "restaurant_restaurantCategory" DROP CONSTRAINT "restaurant_restaurantCategory_RestaurantCategoryId_fkey";

-- DropIndex
DROP INDEX "restaurant_restaurantCategory_RestaurantCategoryId_key";

-- AlterTable
ALTER TABLE "restaurant_restaurantCategory" DROP COLUMN "RestaurantCategoryId",
ADD COLUMN     "restaurantCategoryId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_restaurantCategory_restaurantCategoryId_key" ON "restaurant_restaurantCategory"("restaurantCategoryId");

-- AddForeignKey
ALTER TABLE "restaurant_restaurantCategory" ADD CONSTRAINT "restaurant_restaurantCategory_restaurantCategoryId_fkey" FOREIGN KEY ("restaurantCategoryId") REFERENCES "restaurantCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
