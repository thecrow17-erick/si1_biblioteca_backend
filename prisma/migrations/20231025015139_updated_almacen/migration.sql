/*
  Warnings:

  - The primary key for the `Almacen` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Almacen` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Almacen" DROP CONSTRAINT "Almacen_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "Almacen_id_key" ON "Almacen"("id");
