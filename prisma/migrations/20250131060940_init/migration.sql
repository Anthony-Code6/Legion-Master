-- CreateTable
CREATE TABLE "Rutas" (
    "idRutas" TEXT NOT NULL,
    "ruta" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "Rutas_pkey" PRIMARY KEY ("idRutas")
);

-- CreateTable
CREATE TABLE "Roles" (
    "idRoles" SERIAL NOT NULL,
    "rol" TEXT NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("idRoles")
);

-- CreateTable
CREATE TABLE "Usuarios" (
    "idUsuarios" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "idRol" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("idUsuarios")
);

-- CreateTable
CREATE TABLE "Notas" (
    "idNotas" TEXT NOT NULL,
    "idUsuario" TEXT NOT NULL,
    "url" TEXT,
    "titulo" TEXT NOT NULL,
    "nota" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notas_pkey" PRIMARY KEY ("idNotas")
);

-- CreateTable
CREATE TABLE "Trabajos" (
    "idTrabajos" TEXT NOT NULL,
    "idUsuario" TEXT NOT NULL,
    "url" TEXT,
    "nombre" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Trabajos_pkey" PRIMARY KEY ("idTrabajos")
);

-- CreateTable
CREATE TABLE "Tareas" (
    "idTareas" TEXT NOT NULL,
    "idTrabajo" TEXT NOT NULL,
    "tarea" TEXT NOT NULL,
    "orden" INTEGER NOT NULL,

    CONSTRAINT "Tareas_pkey" PRIMARY KEY ("idTareas")
);

-- CreateTable
CREATE TABLE "Proyectos" (
    "idProyectos" TEXT NOT NULL,
    "idUsuario" TEXT NOT NULL,
    "url" TEXT,
    "link" TEXT,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Proyectos_pkey" PRIMARY KEY ("idProyectos")
);

-- AddForeignKey
ALTER TABLE "Usuarios" ADD CONSTRAINT "Usuarios_idRol_fkey" FOREIGN KEY ("idRol") REFERENCES "Roles"("idRoles") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notas" ADD CONSTRAINT "Notas_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuarios"("idUsuarios") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trabajos" ADD CONSTRAINT "Trabajos_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuarios"("idUsuarios") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tareas" ADD CONSTRAINT "Tareas_idTrabajo_fkey" FOREIGN KEY ("idTrabajo") REFERENCES "Trabajos"("idTrabajos") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proyectos" ADD CONSTRAINT "Proyectos_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuarios"("idUsuarios") ON DELETE RESTRICT ON UPDATE CASCADE;
