import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AdministradorModule } from './administrador/administrador.module';
import { RolesModule } from './roles/roles.module';
import { RutasModule } from './rutas/rutas.module';
import { AuthModule } from './auth/auth.module';
import { NotasModule } from './notas/notas.module';

@Module({
  imports: [PrismaModule, AdministradorModule, AuthModule, NotasModule, RolesModule, RutasModule],
})
export class AppModule { }
