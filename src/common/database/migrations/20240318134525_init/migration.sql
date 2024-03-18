/*
  Warnings:

  - You are about to drop the `Colectors` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Colectors";

-- CreateTable
CREATE TABLE "COLLECTORS" (
    "id" SERIAL NOT NULL,
    "ispb" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "COLLECTORS_pkey" PRIMARY KEY ("id")
);
