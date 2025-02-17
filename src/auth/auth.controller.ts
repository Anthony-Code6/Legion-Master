import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Put, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto, AuthRegisterDto, AuthUpdateDto } from './dto/auth-dto';
import { Response } from 'express';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/core/decorator/roles/roles.decorator';
import { AuthGuard } from 'src/core/guards/auth/auth.guard';
import { RolesGuard } from 'src/core/guards/roles-auth/roles-auth.guard';
import { User } from 'src/core/decorator/user/user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authServices: AuthService) { }


    @Get('auth-users')
    @ApiOperation(
        {
            summary: 'Lista usuarios',
            description: `
            Types
            {
                "_usuarios": Usuarios[],
                "exito": boolean,
                "mensajeError": string,
                "mensaje": string
            }
    
            Description
            {    
                _usuarios: Lista usuarios
                exito: Indicador de éxito  
                mensajeError: Mensaje de error,
                mensaje: Mensaje
            } 
            `
        }
    )
    async usuarios(@Res() res: Response) {
        try {

            var authentication = await this.authServices.Usuarios()
            return res.status(HttpStatus.OK).json({
                exito: true,
                mensajeError: '',
                mensaje: '',
                _usuarios: authentication
            });
        } catch (err) {
            if (err instanceof BadRequestException) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    exito: false,
                    mensajeError: err.message,
                });
            }

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                exito: false,
                mensajeError: 'Ocurrió un error inesperado.',
            });
        }
    }

    @Post('auth-login')
    @ApiOperation(
        {
            summary: 'Autenticacion',
            description: `
            Types
            {
                "_token": string,
                "exito": boolean,
                "mensajeError": string,
                "mensaje": string
            }
    
            Description
            {    
                _token: Token
                exito: Indicador de éxito  
                mensajeError: Mensaje de error,
                mensaje: Mensaje
            } 
            `
        }
    )
    async login(@Body() datos: AuthLoginDto, @Res() res: Response) {
        try {

            var authentication = await this.authServices.login(datos)
            return res.status(HttpStatus.OK).json({
                exito: true,
                mensajeError: '',
                mensaje: '',
                _token: authentication
            });
        } catch (err) {
            if (err instanceof BadRequestException) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    exito: false,
                    mensajeError: err.message,
                });
            }

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                exito: false,
                mensajeError: 'Ocurrió un error inesperado.',
            });
        }
    }

    @Put('auth-update')
    @ApiBearerAuth()
    @ApiOperation(
        {
            summary: 'Actualizar información del usuario',
            description: `
            Types
            {
                "_token": string,
                "exito": boolean,
                "mensajeError": string,
                "mensaje": string
            }
    
            Description
            {    
                _token: Token
                exito: Indicador de éxito  
                mensajeError: Mensaje de error,
                mensaje: Mensaje
            } 
            `
        }
    )
    @Roles('Usuario')
    @UseGuards(AuthGuard, RolesGuard)
    async usuarios_usuario_upd(@Body() datos: AuthUpdateDto, @User('sub') sub: string, @User('email') email: string, @Res() res: Response) {
        try {
            var authentication = await this.authServices.usuarios_usuario_upd(sub, email, datos)
            return res.status(HttpStatus.OK).json({
                exito: true,
                mensajeError: '',
                mensaje: '',
                _token: authentication
            });
        } catch (err) {
            if (err instanceof BadRequestException) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    exito: false,
                    mensajeError: err.message,
                });
            }

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                exito: false,
                mensajeError: 'Ocurrió un error inesperado.',
            });
        }
    }

    @Post('auth-register')
    @ApiOperation(
        {
            summary: 'Crea un nuevo usuario',
            description: `
            Types
            {
                "_usuario": Usuarios,
                "exito": boolean,
                "mensajeError": string,
                "mensaje": string
            }
    
            Description
            {    
                _usuario: Devuelve al usuario registrado
                exito: Indicador de éxito  
                mensajeError: Mensaje de error,
                mensaje: Mensaje
            } 
            `
        }
    )
    async register(@Body() datos: AuthRegisterDto, @Res() res: Response) {
        try {

            var register = await this.authServices.register(datos)
            return res.status(HttpStatus.OK).json({
                exito: true,
                mensajeError: '',
                mensaje: '',
                _usuario: register
            });
        } catch (err) {
            if (err instanceof BadRequestException) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    exito: false,
                    mensajeError: err.message,
                });
            }

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                exito: false,
                mensajeError: 'Ocurrió un error inesperado.',
            });
        }
    }
}
