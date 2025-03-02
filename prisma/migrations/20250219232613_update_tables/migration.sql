-- DropForeignKey
ALTER TABLE "Notas" DROP CONSTRAINT "Notas_idUsuario_fkey";

-- DropForeignKey
ALTER TABLE "Proyectos" DROP CONSTRAINT "Proyectos_idUsuario_fkey";

-- DropForeignKey
ALTER TABLE "Tareas" DROP CONSTRAINT "Tareas_idTrabajo_fkey";

-- DropForeignKey
ALTER TABLE "Trabajos" DROP CONSTRAINT "Trabajos_idUsuario_fkey";

-- AddForeignKey
ALTER TABLE "Notas" ADD CONSTRAINT "Notas_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuarios"("idUsuarios") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trabajos" ADD CONSTRAINT "Trabajos_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuarios"("idUsuarios") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tareas" ADD CONSTRAINT "Tareas_idTrabajo_fkey" FOREIGN KEY ("idTrabajo") REFERENCES "Trabajos"("idTrabajos") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proyectos" ADD CONSTRAINT "Proyectos_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuarios"("idUsuarios") ON DELETE CASCADE ON UPDATE CASCADE;
