import { Module } from '@nestjs/common';
import { AdministradorService } from './administrador.service';
import { AdministradorController } from './administrador.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RutasModule } from 'src/rutas/rutas.module';

@Module({
  imports: [PrismaModule,RutasModule],
  controllers: [AdministradorController],
  providers: [AdministradorService]
})
export class AdministradorModule { }
