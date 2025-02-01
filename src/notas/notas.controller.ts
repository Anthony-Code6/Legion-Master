import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { NotasService } from './notas.service';
import { Response } from 'express';
import { User } from 'src/core/decorator/user/user.decorator';
import { ApiOperation } from '@nestjs/swagger';
import { NotasInstDto, NotasUpdDto } from './dto/notas.dto';
import { AuthGuard } from 'src/core/guards/auth/auth.guard';
import { RolesGuard } from 'src/core/guards/roles-auth/roles-auth.guard';
import { Roles } from 'src/core/decorator/roles/roles.decorator';

@Controller('notas')
@Roles('Usuario')
@UseGuards(AuthGuard,RolesGuard)
export class NotasController {
    constructor(private readonly notasServices: NotasService) { }

    @Get('notas-sellst')
    @ApiOperation(
        {
            summary: 'Lista notas del usuario',
            description: `
            Types
            {
                "_notas": Notas[],
                "exito": boolean,
                "mensajeError": string,
                "mensaje": string
            }
    
            Description
            {    
                _notas: Lista las notas del usuario  
                exito: Indicador de éxito  
                mensajeError: Mensaje de error,
                mensaje: Mensaje
            } 
            `
        }
    )
    async notas_usuarios_sellst(@User('sub') sub: string, @Res() res: Response) {
        try {

            const notas = await this.notasServices.notas_usuarios_sellst(sub);

            return res.status(HttpStatus.OK).json({
                exito: true,
                mensajeError: '',
                mensaje: '',
                _notas: notas
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

    @Get('notas-search/:id')
    @ApiOperation(
        {
            summary: 'Buscar nota ',
            description: `
            Types
            {
                "_notas": Notas,
                "exito": boolean,
                "mensajeError": string,
                "mensaje": string
            }

            Description
            {    
                _notas: Lista la nota del usuario
                exito: Indicador de éxito  
                mensajeError: Mensaje de error,
                mensaje: Mensaje
            }
            `
        }
    )
    async notas_usuarios_getnotas(@Param('id') id: string, @User('sub') sub: string, @Res() res: Response) {
        try {

            const notas = await this.notasServices.notas_usuarios_getnotas(id, sub);

            return res.status(HttpStatus.OK).json({
                exito: true,
                mensajeError: '',
                mensaje: '',
                _notas: notas
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

    @Post('notas-create')
    @ApiOperation(
        {
            summary: 'Crear nota ',
            description: `
            Types
            {
                "_notas": Notas,
                "exito": boolean,
                "mensajeError": string,
                "mensaje": string
            }

            Description
            {    
                _notas: Lista la nota registrada del usuario
                exito: Indicador de éxito  
                mensajeError: Mensaje de error,
                mensaje: Mensaje
            }
            `
        }
    )
    async notas_usuarios_inst(@Body() datos: NotasInstDto, @User('sub') sub: string, @Res() res: Response) {
        try {

            const notas = await this.notasServices.notas_usuarios_inst(sub, datos);

            return res.status(HttpStatus.OK).json({
                exito: true,
                mensajeError: '',
                mensaje: '',
                _notas: notas
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
                mensajeError: 'Ocurrió un error inesperado.' + err,
            });
        }
    }

    @Put('notas-update')
    @ApiOperation(
        {
            summary: 'Actualizar nota ',
            description: `
            Types
            {
                "_notas": Notas,
                "exito": boolean,
                "mensajeError": string,
                "mensaje": string
            }

            Description
            {    
                _notas: Lista la nota actualizada del usuario
                exito: Indicador de éxito  
                mensajeError: Mensaje de error,
                mensaje: Mensaje
            }
            `
        }
    )
    async notas_usuarios_upd(@Body() datos: NotasUpdDto, @User('sub') sub: string, @Res() res: Response) {
        try {

            const notas = await this.notasServices.notas_usuarios_upd(sub, datos);

            return res.status(HttpStatus.OK).json({
                exito: true,
                mensajeError: '',
                mensaje: '',
                _notas: notas
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

    @Delete('notas-delete/:id')
    @ApiOperation(
        {
            summary: 'Eliminar nota ',
            description: `
            Types
            {
                "_notas": Notas,
                "exito": boolean,
                "mensajeError": string,
                "mensaje": string
            }

            Description
            {    
                _notas: Lista la nota eliminada del usuario
                exito: Indicador de éxito  
                mensajeError: Mensaje de error,
                mensaje: Mensaje
            }
            `
        }
    )
    async notas_usuarios_dlt(@Param('id') id: string, @User('sub') sub: string, @Res() res: Response) {
        try {

            const notas = await this.notasServices.notas_usuarios_dlt(id, sub);

            return res.status(HttpStatus.OK).json({
                exito: true,
                mensajeError: '',
                mensaje: '',
                _notas: notas
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
