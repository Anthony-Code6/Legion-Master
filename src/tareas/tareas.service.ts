import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TrabajoCreateDto } from './dto/trabajo.dto';
import { TareaCreateDto, TareaUpdateStatuDto } from './dto/tarea.dto';

@Injectable()
export class TareasService {
    constructor(private readonly prismaService: PrismaService) { }

    async trabajo_usuario_sellst(idusuario: string) {
        try {
            const trabajo = await this.prismaService.trabajos.findMany({
                where: {
                    idUsuario: idusuario
                },
                include: {
                    Tareas: {
                        orderBy: {
                            orden: 'asc'
                        }
                    },
                },
            })

            return trabajo
        } catch (error) {
            throw error
        }
    }

    async trabajo_usuario_getTrabajo(idusuario: string, idtrabajo: string) {
        try {
            const trabajo = await this.prismaService.trabajos.findFirst({
                where: {
                    idTrabajos: idtrabajo,
                    idUsuario: idusuario,
                }, include: {
                    Tareas: {
                        orderBy: {
                            orden: 'asc'
                        }
                    },
                },
            })
            if (trabajo) {
                return trabajo
            } else {
                throw new BadRequestException('El area de trabajo no existe en el sistema.')
            }
        } catch (error) {
            throw error
        }
    }

    async trabajo_usuario_dlt(idusuario: string, idtrabajo: string) {
        try {

            await this.trabajo_usuario_getTrabajo(idusuario, idtrabajo)

            const trabajo = await this.prismaService.trabajos.delete({
                where: {
                    idTrabajos: idtrabajo,
                    idUsuario: idusuario,
                }
            })
            return trabajo
        } catch (error) {
            throw error
        }
    }

    async trabajo_tarea_usuario_upd_estado(idusuario: string, datos: TareaUpdateStatuDto) {
        try {

            await this.trabajo_usuario_getTrabajo(idusuario, datos.idTrabajo)

            const trabajo = await this.prismaService.tareas.update({
                where: {
                    idTareas: datos.idTareas
                },
                data: {
                    estado: datos.estado
                }
            })

            const list = this.trabajo_usuario_getTrabajo(idusuario, datos.idTrabajo)
            return list
        } catch (error) {
            throw error
        }
    }

    async trabajo_usuario_inst(idusuario: string, datos: TrabajoCreateDto) {
        try {
            const trabajo_new = await this.prismaService.trabajos.create({
                data: {
                    idUsuario: idusuario,
                    url: datos.nombre.replace(' ', '-'),
                    nombre: datos.nombre
                }
            })

            if (trabajo_new) {
                const list_tareas = datos.tareas.map((element, index) => {
                    return this.prismaService.tareas.create({
                        data: {
                            idTrabajo: trabajo_new.idTrabajos,
                            tarea: element.tarea,
                            orden: index,
                            estado: element.estado
                        }
                    })

                })

                await Promise.all(list_tareas)

                const all_task = await this.trabajo_usuario_sellst(idusuario)
                return all_task

            } else {
                throw new BadRequestException('Error al crear el area de trabajo para estas tareas.')
            }

        } catch (error) {
            throw error
        }
    }


}
