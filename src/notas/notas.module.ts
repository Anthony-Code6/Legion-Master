import { Module } from '@nestjs/common';
import { NotasService } from './notas.service';
import { NotasController } from './notas.controller';
import { INotasRepository } from './interfaces/notas-repository.interface';
import { NotasRepository } from './repositories/notas.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  

})
export class NotasModule { }
