import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { RutasService } from './rutas.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { RutasCreateDto, RutasUpdateDto } from './dto/rutas-dto';
import { AuthGuard } from 'src/core/guards/auth/auth.guard';
import { RolesGuard } from 'src/core/guards/roles-auth/roles-auth.guard';
import { Roles } from 'src/core/decorator/roles/roles.decorator';

@Controller('rutas')
@ApiBearerAuth()
@Roles('Administrador')
@UseGuards(AuthGuard, RolesGuard)
export class RutasController {
    constructor(private readonly rutasServices: RutasService) { }

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
                "mensaje": string
            }
    
            Description
            {    
                _rutas: Lista rutas
                exito: Indicador de éxito  
                mensajeError: Mensaje de error,
                mensaje: Mensaje
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
                _rutas: rutas,
                _info: res['user']
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

    @Get('/rutas-search/:id')
    @ApiOperation(
        {
            summary: "Buscar ruta",
            description: `
            Types
            {
                "_rutas": Rutas,
                "exito": boolean,
                "mensajeError": string,
                "mensaje": string
            }
    
            Description
            {    
                _rutas: Lista la ruta
                exito: Indicador de éxito  
                mensajeError: Mensaje de error,
                mensaje: Mensaje
            } 
            `
        }
    )
    async rutas_getruta(@Param('id') id: string, @Res() res: Response) {
        try {
            var rutas = await this.rutasServices.rutas_getruta(id)
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

    @Post('/rutas-create')
    @ApiOperation(
        {
            summary: "Registrar ruta",
            description: `
            Types
            {
                "_rutas": Rutas,
                "exito": boolean,
                "mensajeError": string,
                "mensaje": string
            }
    
            Description
            {    
                _rutas: Lista la ruta registrada
                exito: Indicador de éxito  
                mensajeError: Mensaje de error,
                mensaje: Mensaje
            } 
            `
        }
    )
    async rutas_inst(@Body() datos: RutasCreateDto, @Res() res: Response) {
        try {
            var rutas = await this.rutasServices.rutas_inst(datos)
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

    @Put('/rutas-update')
    @ApiOperation(
        {
            summary: "Actualizar ruta",
            description: `
            Types
            {
                "_rutas": Rutas,
                "exito": boolean,
                "mensajeError": string,
                "mensaje": string
            }
    
            Description
            {    
                _rutas: Lista la ruta actualizada
                exito: Indicador de éxito  
                mensajeError: Mensaje de error,
                mensaje: Mensaje
            } 
            `
        }
    )
    async rutas_upd(@Body() datos: RutasUpdateDto, @Res() res: Response) {
        try {
            var rutas = await this.rutasServices.rutas_upd(datos)
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

    @Delete('/rutas-delete/:id')
    @ApiOperation(
        {
            summary: "Eliminar ruta",
            description: `
            Types
            {
                "_rutas": Rutas,
                "exito": boolean,
                "mensajeError": string,
                "mensaje": string
            }
    
            Description
            {    
                _rutas: Lista la ruta eliminada
                exito: Indicador de éxito  
                mensajeError: Mensaje de error,
                mensaje: Mensaje
            } 
            `
        }
    )
    async rutas_dlt(@Param('id') id: string, @Res() res: Response) {
        try {
            var rutas = await this.rutasServices.rutas_dlt(id)
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
