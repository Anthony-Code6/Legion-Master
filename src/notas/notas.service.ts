import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotasInstDto } from './dto/notas-inst.dto';
import { NotasUpdDto } from './dto/notas-upd.dto';
import { INotasRepository } from './interfaces/notas-repository.interface';

@Injectable()
export class NotasService {

    constructor(private readonly notasRepository: INotasRepository) {}

    async notas_usuarios_sellst(idUsuario: string) {
        return await this.notasRepository.getNotasByUsuario(idUsuario)
    }

    async notas_usuarios_inst(idUsuario: string, datos: NotasInstDto) {
        return await this.notasRepository.createNota(idUsuario, datos)
    }

    async notas_usuarios_upd(idUsuario: string, datos: NotasUpdDto) {
        return this.notas_usuarios_upd(idUsuario, datos)
    }

    async notas_usuarios_getnotas(idNotas: string, idUsuario: string) {
        return await this.notas_usuarios_getnotas(idNotas, idUsuario)
    }

    async notas_usuarios_dlt(idNotas: string, idUsuario: string) {
        return await this.notas_usuarios_dlt(idNotas, idUsuario)
    }
}
