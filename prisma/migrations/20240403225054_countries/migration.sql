/*
  Warnings:

  - You are about to drop the `Contries` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Contries";

-- CreateTable
CREATE TABLE "Countries" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Countries_pkey" PRIMARY KEY ("id")
);
