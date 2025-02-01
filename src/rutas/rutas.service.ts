import { BadRequestException, Injectable } from '@nestjs/common';
import { RutasCreateDto, RutasUpdateDto } from './dto/rutas-dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RutasService {
    constructor(private prismaService: PrismaService) { }

    async rutas_sellst() {
        try {
            const rutas = await this.prismaService.rutas.findMany()
            return rutas
        } catch (err) {
            throw err
        }
    }

    async rutas_getruta(id: string) {
        try {
            const ruta = await this.prismaService.rutas.findFirst({
                where: {
                    idRutas: id
                }
            })

            if (ruta) {
                return ruta
            } else {
                throw new BadRequestException('La ruta no existe en el sistema')
            }

        } catch (err) {
            throw err
        }
    }

    async rutas_inst(datos: RutasCreateDto) {
        try {
            const ruta_nueva = await this.prismaService.rutas.create({
                data: {
                    ruta: datos.ruta,
                    icon: datos.icon
                },
            })
            return ruta_nueva
        } catch (err) {
            throw err
        }
    }

    async rutas_upd(datos: RutasUpdateDto) {
        try {

            await this.rutas_getruta(datos.idRutas)

            const ruta_editar = await this.prismaService.rutas.update({
                where: {
                    idRutas: datos.idRutas
                },
                data: {
                    ruta: datos.ruta,
                    icon: datos.icon
                },
            })
            return ruta_editar
        } catch (err) {
            throw err
        }
    }

    async rutas_dlt(id: string) {
        try {
            await this.rutas_getruta(id)

            const eliminar_ruta = this.prismaService.rutas.delete({
                where: {
                    idRutas: id
                }
            })
            return eliminar_ruta

        } catch (err) {
            throw err
        }
    }
}
