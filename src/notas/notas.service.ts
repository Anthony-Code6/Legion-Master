import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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

    async notas_usuarios_inst(idUsuario: string) {
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
}
