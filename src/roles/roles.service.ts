import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RolesCreateDto, RolesUpdateDto } from './dto/roles-dto';

@Injectable()
export class RolesService {

    constructor(private prismaService: PrismaService) { }

    async roles_sellst() {
        try {
            const roles = await this.prismaService.roles.findMany()
            return roles
        } catch (err) {
            throw err
        }
    }

    async roles_getrol(id: number) {
        try {
            const roles = await this.prismaService.roles.findFirst({
                where: {
                    idRoles: id
                }
            })

            if (roles) {
                return roles
            } else {
                throw new BadRequestException('El rol no existe en el sistema')
            }

        } catch (err) {
            throw err
        }
    }

    async roles_inst(datos: RolesCreateDto) {
        try {
            const nuevo_rol = await this.prismaService.roles.create({
                data: {
                    rol: datos.rol
                },
            })
            return nuevo_rol
        } catch (err) {
            throw err
        }
    }

    async roles_upd(datos: RolesUpdateDto) {
        try {

            await this.roles_getrol(datos.idRoles)

            const rol_editado = await this.prismaService.roles.update({
                where: {
                    idRoles: datos.idRoles
                },
                data: {
                    rol: datos.rol
                },
            })
            return rol_editado
        } catch (err) {
            throw err
        }
    }

    async roles_dlt(id: number) {
        try {
            await this.roles_getrol(id)

            const eliminar_rol = this.prismaService.roles.delete({
                where: {
                    idRoles:id
                }
            })
            return eliminar_rol

        } catch (err) {
            throw err
        }
    }
}
