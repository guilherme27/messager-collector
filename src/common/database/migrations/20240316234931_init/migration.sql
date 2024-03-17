-- CreateTable
CREATE TABLE "USER" (
    "nome" TEXT NOT NULL,
    "cpfCnpj" TEXT NOT NULL,
    "ispb" TEXT NOT NULL,
    "agencia" TEXT NOT NULL,
    "contaTransacional" TEXT NOT NULL,
    "tipoConta" TEXT NOT NULL,

    CONSTRAINT "USER_pkey" PRIMARY KEY ("cpfCnpj")
);

-- CreateTable
CREATE TABLE "MESSAGE" (
    "endToEndId" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "pagadorid" TEXT NOT NULL,
    "recebedorid" TEXT NOT NULL,
    "campoLivre" TEXT,
    "txId" TEXT,
    "dataHoraPagamento" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "read" TIMESTAMP(3),

    CONSTRAINT "MESSAGE_pkey" PRIMARY KEY ("endToEndId")
);

-- CreateIndex
CREATE UNIQUE INDEX "USER_cpfCnpj_key" ON "USER"("cpfCnpj");

-- CreateIndex
CREATE UNIQUE INDEX "MESSAGE_endToEndId_key" ON "MESSAGE"("endToEndId");

-- AddForeignKey
ALTER TABLE "MESSAGE" ADD CONSTRAINT "MESSAGE_pagadorid_fkey" FOREIGN KEY ("pagadorid") REFERENCES "USER"("cpfCnpj") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MESSAGE" ADD CONSTRAINT "MESSAGE_recebedorid_fkey" FOREIGN KEY ("recebedorid") REFERENCES "USER"("cpfCnpj") ON DELETE RESTRICT ON UPDATE CASCADE;
