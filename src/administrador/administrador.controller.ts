import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { AdministradorService } from './administrador.service';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { RutasService } from 'src/rutas/rutas.service';

@Controller('administrador')
export class AdministradorController {
    constructor(private readonly adminServices: AdministradorService,
        private readonly rutasServices: RutasService
    ) { }

    @Get('/rutas-list')
    @ApiOperation(
        { 
            summary: "Lista rutas",
            description: `
            Types
            {
                "_rutas": Rutas[],
                "exito": boolean,
                "mensajeError": string,
                "pilaError": string
            }
    
            Description
            {    
                _notas: Lista rutas
                exito: Indicador de éxito  
                mensajeError: Mensaje de error
            } 
            `
        }
    )
    async rutas_sellst(@Res() res: Response) {
        try {

            var rutas = await this.rutasServices.rutas_sellst()
            return res.status(HttpStatus.OK).json({
                exito: true,
                mensajeError: '',
                mensaje: '',
                _rutas: rutas
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
