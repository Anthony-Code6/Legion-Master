-- CreateTable
CREATE TABLE `Roles` (
    `idRoles` INTEGER NOT NULL AUTO_INCREMENT,
    `rol` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idRoles`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuarios` (
    `idUsuarios` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `idRol` INTEGER NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `estado` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Usuarios_email_key`(`email`),
    PRIMARY KEY (`idUsuarios`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notas` (
    `idNotas` VARCHAR(191) NOT NULL,
    `idUsuario` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `nota` VARCHAR(191) NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`idNotas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Trabajos` (
    `idTrabajos` VARCHAR(191) NOT NULL,
    `idUsuario` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`idTrabajos`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tareas` (
    `idTareas` VARCHAR(191) NOT NULL,
    `idTrabajo` VARCHAR(191) NOT NULL,
    `tarea` VARCHAR(191) NOT NULL,
    `orden` INTEGER NOT NULL,
    `estado` BOOLEAN NOT NULL,

    PRIMARY KEY (`idTareas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Proyectos` (
    `idProyectos` VARCHAR(191) NOT NULL,
    `idUsuario` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NULL,
    `link` VARCHAR(191) NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `estado` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`idProyectos`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuarios` ADD CONSTRAINT `Usuarios_idRol_fkey` FOREIGN KEY (`idRol`) REFERENCES `Roles`(`idRoles`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notas` ADD CONSTRAINT `Notas_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuarios`(`idUsuarios`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Trabajos` ADD CONSTRAINT `Trabajos_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuarios`(`idUsuarios`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tareas` ADD CONSTRAINT `Tareas_idTrabajo_fkey` FOREIGN KEY (`idTrabajo`) REFERENCES `Trabajos`(`idTrabajos`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Proyectos` ADD CONSTRAINT `Proyectos_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuarios`(`idUsuarios`) ON DELETE CASCADE ON UPDATE CASCADE;
