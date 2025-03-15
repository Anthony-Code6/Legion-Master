import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { INotasRepository } from '../interfaces/notas-repository.interface';
import { NotasInstDto } from '../dto/notas-inst.dto';
import { NotasUpdDto } from '../dto/notas-upd.dto';
import { Notas } from '../entities/notas.entity';

@Injectable()
export class NotasRepository implements INotasRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getNotasByUsuario(idUsuario: string): Promise<Notas[]> {
    return this.prismaService.notas.findMany({
      where: { idUsuario },
      orderBy: { titulo: 'asc' },
    });
  }

  async getNotaById(idNotas: string, idUsuario: string): Promise<Notas | null> {
    const nota = await this.prismaService.notas.findFirst({
      where: { idNotas, idUsuario },
    });

    if (!nota) {
      throw new BadRequestException('La nota de este usuario no existe en el sistema');
    }

    return nota;
  }

  async createNota(idUsuario: string, datos: NotasInstDto): Promise<Notas> {
    return this.prismaService.notas.create({
      data: {
        idUsuario,
        url: datos.titulo.replace(' ', '-'),
        titulo: datos.titulo,
        nota: datos.nota,
      },
    });
  }

  async updateNota(idUsuario: string, datos: NotasUpdDto): Promise<Notas> {
    await this.getNotaById(datos.idNotas, idUsuario);

    return this.prismaService.notas.update({
      where: { idNotas: datos.idNotas },
      data: {
        url: datos.titulo.replace(' ', '-'),
        titulo: datos.titulo,
        nota: datos.nota,
      },
    });
  }

  async deleteNota(idNotas: string, idUsuario: string): Promise<Notas> {
    await this.getNotaById(idNotas, idUsuario);

    return this.prismaService.notas.delete({
      where: { idNotas, idUsuario },
    });
  }
}
