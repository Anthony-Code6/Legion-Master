import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthLoginDto, AuthRegisterDto, AuthUpdateDto } from './dto/auth-dto';
import { compare, encrypt } from 'src/core/libs/encryption';

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService, private readonly jwtServices: JwtService) { }

    async login(auth: AuthLoginDto) {
        try {
            const authentication = await this.prismaService.usuarios.findFirst({
                where: {
                    email: auth.email
                },
                select: {
                    idUsuarios: true,
                    nombre: true,
                    apellido: true,
                    password: true,
                    email: true,
                    estado: true,
                    roles: {
                        select: {
                            rol: true,
                        }
                    }
                }
            })

            if (!authentication) {
                throw new BadRequestException('El correo electronico es invalido.')
            }
            const isPassword = await compare(auth.password, authentication.password)

            if (!isPassword) {
                throw new BadRequestException('La contraseña es invalida.')
            }

            const { password: _, idUsuarios, roles, ...usuarioWithoutPassword } = authentication
            const paylod = {
                sub: idUsuarios,
                role: roles.rol,
                ...usuarioWithoutPassword
            }
            const access_token = await this.jwtServices.signAsync(paylod)
            return access_token
        } catch (err) {
            console.log(err);
            throw err
        }
    }

    async register(datos: AuthRegisterDto) {
        try {
            const validate_email = await this.prismaService.usuarios.findUnique({
                where: {
                    email: datos.email
                }
            })

            if (validate_email) {
                throw new BadRequestException('El correo electronico ya existe en el sistema')
            } else {
                const register = await this.prismaService.usuarios.create({
                    data: {
                        nombre: datos.nombre,
                        apellido: datos.apellido,
                        email: datos.email,
                        password: await encrypt(datos.password),
                        idRol: 2
                    }
                })

                return register
            }


        } catch (err) {
            throw err
        }
    }

    async usuarios_usuario_upd(idUsuario: string, email: string, datos: AuthUpdateDto) {
        try {
            const usuario_update = await this.prismaService.usuarios.update({
                where: {
                    idUsuarios: idUsuario
                },
                data: {
                    nombre: datos.nombre,
                    apellido: datos.apellido,
                    password: await encrypt(datos.password)
                }
            })

            if (usuario_update) {
                const auth = new AuthLoginDto()
                auth.email = email
                auth.password = datos.password
                return await this.login(auth)
            } else {
                throw new BadRequestException('No se a podido editar la información.')
            }

        } catch (err) {
            throw err
        }
    }

    async Usuarios() {
        try {
            const usuarios = await this.prismaService.usuarios.findMany()

            return usuarios
        } catch (err) {
            throw err
        }
    }
}
