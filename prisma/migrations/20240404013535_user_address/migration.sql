/*
  Warnings:

  - You are about to drop the column `countriesId` on the `UserAddress` table. All the data in the column will be lost.
  - You are about to drop the `Countries` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `countryId` to the `UserAddress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserAddress" DROP CONSTRAINT "UserAddress_countriesId_fkey";

-- AlterTable
ALTER TABLE "UserAddress" DROP COLUMN "countriesId",
ADD COLUMN     "countryId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Countries";

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserAddress" ADD CONSTRAINT "UserAddress_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
