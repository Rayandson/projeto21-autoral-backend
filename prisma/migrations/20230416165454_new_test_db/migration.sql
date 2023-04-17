/*
  Warnings:

  - You are about to drop the `_MenuItemToOrder` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `profileName` to the `restaurants` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('ITEM', 'SUB_ITEM');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('ORDERED', 'PREPARING', 'FINISHED');

-- DropForeignKey
ALTER TABLE "_MenuItemToOrder" DROP CONSTRAINT "_MenuItemToOrder_A_fkey";

-- DropForeignKey
ALTER TABLE "_MenuItemToOrder" DROP CONSTRAINT "_MenuItemToOrder_B_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_userId_fkey";

-- DropIndex
DROP INDEX "itemCategories_restaurantId_key";

-- DropIndex
DROP INDEX "menuItems_categoryId_key";

-- DropIndex
DROP INDEX "menuItems_restaurantId_key";

-- DropIndex
DROP INDEX "orders_restaurantId_key";

-- DropIndex
DROP INDEX "orders_tableId_key";

-- DropIndex
DROP INDEX "orders_userId_key";

-- AlterTable
ALTER TABLE "menuItems" ADD COLUMN     "itHasSubItems" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "type" "ItemType" NOT NULL DEFAULT 'ITEM',
ALTER COLUMN "price" DROP NOT NULL,
ALTER COLUMN "image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "isPaid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'ORDERED',
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "restaurants" ADD COLUMN     "profileName" VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE "_MenuItemToOrder";

-- CreateTable
CREATE TABLE "subItems" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL,
    "image" VARCHAR(500),
    "description" VARCHAR(255) NOT NULL,
    "type" "ItemType" NOT NULL DEFAULT 'SUB_ITEM',
    "rating" INTEGER NOT NULL DEFAULT 30,
    "orderCount" INTEGER NOT NULL DEFAULT 0,
    "itemId" INTEGER NOT NULL,
    "restaurantId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "subItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant_table" (
    "id" SERIAL NOT NULL,
    "restaurantId" INTEGER NOT NULL,
    "tableId" INTEGER NOT NULL,

    CONSTRAINT "restaurant_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menuItem_order" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "menuItem_order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subItem_order" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "subItem_order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "subItems" ADD CONSTRAINT "subItems_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subItems" ADD CONSTRAINT "subItems_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "itemCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subItems" ADD CONSTRAINT "subItems_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "menuItems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurant_table" ADD CONSTRAINT "restaurant_table_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurant_table" ADD CONSTRAINT "restaurant_table_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "tables"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menuItem_order" ADD CONSTRAINT "menuItem_order_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "menuItems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menuItem_order" ADD CONSTRAINT "menuItem_order_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subItem_order" ADD CONSTRAINT "subItem_order_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "subItems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subItem_order" ADD CONSTRAINT "subItem_order_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
