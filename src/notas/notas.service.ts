import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotasInstDto, NotasUpdDto } from './dto/notas.dto';

@Injectable()
export class NotasService {

    constructor(private readonly prismaService: PrismaService) { }

    async notas_usuarios_sellst(idUsuario: string) {
        try {
            const notas = await this.prismaService.notas.findMany({
                where: {
                    idUsuario: idUsuario
                }
            })
            return notas
        } catch (err) {
            throw err
        }
    }

    async notas_usuarios_inst(idUsuario: string, datos: NotasInstDto) {
        try {
            const notas = await this.prismaService.notas.create({
                data: {
                    idUsuario: idUsuario,
                    url: datos.titulo.replace(' ', '-'),
                    titulo: datos.titulo,
                    nota: datos.nota
                }
            })
            return notas
        } catch (err) {
            throw err
        }
    }

    async notas_usuarios_upd(idUsuario: string, datos: NotasUpdDto) {
        try {
            await this.notas_usuarios_getnotas(datos.idNotas, idUsuario)
            const notas = await this.prismaService.notas.update({
                where: {
                    idNotas: datos.idNotas
                },
                data: {
                    url: datos.titulo.replace(' ', '-'),
                    titulo: datos.titulo,
                    nota: datos.nota
                }
            })
            return notas
        } catch (err) {
            throw err
        }
    }

    async notas_usuarios_getnotas(idNotas: string, idUsuario: string) {
        try {
            const notas = await this.prismaService.notas.findFirst({
                where: {
                    idNotas: idNotas,
                    idUsuario: idUsuario
                }
            })
            if (notas) {
                return notas
            } else {
                throw new BadRequestException('La nota de este usuario no existe en el sistema')
            }
        } catch (err) {
            throw err
        }
    }

    async notas_usuarios_dlt(idNotas: string, idUsuario: string) {
        try {
            await this.notas_usuarios_getnotas(idNotas, idUsuario)
            const notas = await this.prismaService.notas.delete({
                where: {
                    idNotas: idNotas,
                    idUsuario: idUsuario
                }
            })
            return notas
        } catch (err) {
            throw err
        }
    }
}
