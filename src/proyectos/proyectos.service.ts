import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProyectosCreate, ProyectosUpdate } from './dto/proyectos.dto';

@Injectable()
export class ProyectosService {
    constructor(private readonly prismaServices: PrismaService) { }

    async proyectos_usuarios_sellst(usuarioId: string) {
        try {
            const proyectos = await this.prismaServices.proyectos.findMany({
                where: {
                    idUsuario: usuarioId
                }
            })

            return proyectos
        } catch (err) {
            throw err
        }
    }

    async proyectos_usuarios_inst(usuarioId: string, datos: ProyectosCreate) {
        try {
            const proyectos = await this.prismaServices.proyectos.create({
                data: {
                    idUsuario: usuarioId,
                    url: datos.titulo.replace(' ', '-'),
                    link: datos.link,
                    titulo: datos.titulo,
                    descripcion: datos.descripcion,
                    estado: datos.estado
                }
            })

            return proyectos
        } catch (err) {
            throw err
        }
    }

    async proyectos_usuarios_upd(usuarioId: string, datos: ProyectosUpdate) {
        try {

            await this.proyectos_usuario_getproyecto(usuarioId, datos.idProyectos)

            const proyectos = await this.prismaServices.proyectos.update({
                where:{
                    idProyectos:datos.idProyectos
                },
                data: {
                    idUsuario: usuarioId,
                    url: datos.titulo.replace(' ', '-'),
                    link: datos.link,
                    titulo: datos.titulo,
                    descripcion: datos.descripcion,
                    estado: datos.estado
                }
            })

            return proyectos
        } catch (err) {
            throw err
        }
    }

    async proyectos_usuario_getproyecto(usuarioId: string, proyectoId: string) {
        try {
            const proyecto = await this.prismaServices.proyectos.findFirst({
                where: {
                    idProyectos: proyectoId,
                    idUsuario: usuarioId
                }
            })

            if (!proyecto) {
                throw new BadRequestException('El proyecto del usuario no existe en el sistema.')
            } else {

                return proyecto
            }
        } catch (err) {
            throw err
        }
    }

    async proyectos_usuario_dlt(usuarioId: string, proyectoId: string) {
        try {
            await this.proyectos_usuario_getproyecto(usuarioId, proyectoId)

            const proyecto = await this.prismaServices.proyectos.delete({
                where: {
                    idProyectos: proyectoId,
                    idUsuario: usuarioId
                }
            })

            if (proyecto) {
                return proyecto
            } else {
                throw new BadRequestException('El proyecto no existe en el sistema.')
            }

        } catch (err) {
            throw err
        }
    }
}
