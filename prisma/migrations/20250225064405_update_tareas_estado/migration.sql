/*
  Warnings:

  - Added the required column `estado` to the `Tareas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Proyectos" ALTER COLUMN "estado" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Tareas" ADD COLUMN     "estado" BOOLEAN NOT NULL;
