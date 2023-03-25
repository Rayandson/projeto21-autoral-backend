/*
  Warnings:

  - You are about to alter the column `cep` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Char(8)`.
  - You are about to alter the column `themeColor` on the `restaurants` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(7)`.

*/
-- AlterTable
ALTER TABLE "addresses" ALTER COLUMN "cep" SET DATA TYPE CHAR(8);

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "userCpf" SET DATA TYPE CHAR(11);

-- AlterTable
ALTER TABLE "restaurants" ADD COLUMN     "fontColor" VARCHAR(7) NOT NULL DEFAULT '#000000',
ALTER COLUMN "cnpj" SET DATA TYPE CHAR(14),
ALTER COLUMN "themeColor" SET DATA TYPE VARCHAR(7);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "cpf" SET DATA TYPE CHAR(11);
