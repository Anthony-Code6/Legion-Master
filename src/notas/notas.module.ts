import { Module } from '@nestjs/common';
import { NotasService } from './notas.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NotasController } from './notas.controller';

@Module({
  imports:[PrismaModule],
  controllers:[NotasController],
  providers: [NotasService]
})
export class NotasModule {}
