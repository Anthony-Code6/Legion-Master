import { BadRequestException, Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto, AuthRegisterDto } from './dto/auth-dto';
import { Response } from 'express';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private readonly authServices: AuthService) { }

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
