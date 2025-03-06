import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdministradorService {
    constructor(private prismaServices: PrismaService) { }

    async Admin_Trabajo_TotalTareas(usuarioid: string) {
        try {
            const trabajos_total_tareas = await this.prismaServices.trabajos.findMany(
                {
                    where: {
                        idUsuario: usuarioid
                    },
                    select: {
                        nombre: true,
                        Tareas: {
                            select: {
                                estado: true
                            }
                        },
                        _count: {
                            select: { Tareas: true }
                        }
                    },
                    orderBy:{
                        nombre:'asc'
                    }
                }
            )

            // Procesar los datos para contar tareas en estado true y false
            return trabajos_total_tareas.map(trabajo => {
                const total = trabajo._count.Tareas;
                const completado = trabajo.Tareas.filter(t => t.estado).length;
                const pendiente = total - completado;

                return {
                    nombre: trabajo.nombre,
                    total,
                    completado,
                    pendiente
                };
            });
        } catch (err) {
            throw err
        }
    }

    async Admin_Total_Areas(usuarioid: string) {
        try {

            const notas = await this.prismaServices.usuarios.findUnique(
                {
                    where: { idUsuarios: usuarioid },
                    select: {
                        _count: {
                            select: { Notas: true }
                        }
                    }
                }
            )

            const proyectos = await this.prismaServices.usuarios.findUnique(
                {
                    where: { idUsuarios: usuarioid },
                    select: {
                        _count: {
                            select: { Proyectos: true }
                        }
                    }
                }
            )

            const labels = ['Notas', 'Proyectos']
            const data = [notas?._count.Notas, proyectos?._count.Proyectos]
            
            // Procesar los datos para contar tareas en estado true y false
            return {
                labels: labels,
                data: data
            }
        } catch (err) {
            throw err
        }
    }
}
