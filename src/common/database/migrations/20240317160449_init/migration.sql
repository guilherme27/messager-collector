-- CreateTable
CREATE TABLE "Colectors" (
    "id" SERIAL NOT NULL,
    "ispb" TEXT NOT NULL,
    "isActive" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Colectors_pkey" PRIMARY KEY ("id")
);
