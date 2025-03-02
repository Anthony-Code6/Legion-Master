import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AdministradorModule } from './administrador/administrador.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { NotasModule } from './notas/notas.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ProyectosModule } from './proyectos/proyectos.module';
import { TareasModule } from './tareas/tareas.module';

@Module({
  imports: [PrismaModule, ProyectosModule, AdministradorModule, AuthModule, UsuariosModule, NotasModule, RolesModule, TareasModule],
})
export class AppModule { }
