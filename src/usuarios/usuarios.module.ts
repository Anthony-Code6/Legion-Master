import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsuariosService } from './usuarios.service';

@Module({
  imports:[PrismaModule],
  controllers: [UsuariosController],
  providers:[UsuariosService]
})
export class UsuariosModule {}
