import { BadRequestException, Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { NotasService } from './notas.service';
import { Response } from 'express';
import { User } from 'src/core/decorator/user/user.decorator';
import { ApiOperation } from '@nestjs/swagger';

@Controller('notas')
export class NotasController {
    constructor(private readonly notasServices: NotasService) { }

    @Get('notas-sellst')
    @ApiOperation(
        {
            summary: 'Lista todas las notas del usuario',
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
}
