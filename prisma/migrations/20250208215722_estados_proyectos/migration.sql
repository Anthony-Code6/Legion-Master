/*
  Warnings:

  - Added the required column `estado` to the `Proyectos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Proyectos" ADD COLUMN     "estado" BOOLEAN NOT NULL;
