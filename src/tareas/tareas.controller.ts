import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { TrabajoCreateDto, TrabajoUpdateDto } from './dto/trabajo.dto';
import { User } from 'src/core/decorator/user/user.decorator';
import { Roles } from 'src/core/decorator/roles/roles.decorator';
import { AuthGuard } from 'src/core/guards/auth/auth.guard';
import { RolesGuard } from 'src/core/guards/roles-auth/roles-auth.guard';
import { TareasService } from './tareas.service';
import { TareaUpdateStatuDto } from './dto/tarea.dto';

@Controller('tareas')
@ApiBearerAuth()
@Roles('Usuario')
@UseGuards(AuthGuard, RolesGuard)
export class TareasController {

    constructor(private readonly tareaServices: TareasService) {

    }

    @Get('/trabajo-list')
    @ApiOperation(
        {
            summary: "Lista trabajos",
            description: `
                Types
                {
                    "_trabajo": Trabajos[],
                    "exito": boolean,
                    "mensajeError": string,
                    "mensaje": string
                }
        
                Description
                {    
                    _trabajo: Lista trabajos
                    exito: Indicador de éxito  
                    mensajeError: Mensaje de error,
                    mensaje: Mensaje
                } 
                `
        }
    )
    async trabajo_usuario_sellst(@Res() res: Response, @User('sub') sub: string) {
        try {
            const trabajo = await this.tareaServices.trabajo_usuario_sellst(sub)
            return res.status(HttpStatus.OK).json({
                exito: true,
                mensajeError: '',
                mensaje: '',
                _trabajo: trabajo
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

    @Get('/trabajo-search/:id')
    @ApiOperation(
        {
            summary: "Lista trabajos",
            description: `
                Types
                {
                    "_trabajo": Trabajos,
                    "exito": boolean,
                    "mensajeError": string,
                    "mensaje": string
                }
        
                Description
                {    
                    _trabajo: Lista trabajo
                    exito: Indicador de éxito  
                    mensajeError: Mensaje de error,
                    mensaje: Mensaje
                } 
                `
        }
    )
    async trabajo_usuario_getTrabajo(@Res() res: Response, @User('sub') sub: string, @Param('id') id: string) {
        try {
            const trabajo = await this.tareaServices.trabajo_usuario_getTrabajo(sub, id)
            return res.status(HttpStatus.OK).json({
                exito: true,
                mensajeError: '',
                mensaje: '',
                _trabajo: trabajo
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


    @Post('/trabajo-create')
    @ApiOperation(
        {
            summary: "Crear trabajo y tareas",
            description: `
                Types
                {
                    "_trabajo": Trabajo[],
                    "exito": boolean,
                    "mensajeError": string,
                    "mensaje": string
                }
        
                Description
                {    
                    _trabajo: Lista trabajo
                    exito: Indicador de éxito  
                    mensajeError: Mensaje de error,
                    mensaje: Mensaje
                } 
                `
        }
    )
    async trabajo_tarea_usuario_inst(@Body() datos: TrabajoCreateDto, @User('sub') sub: string, @Res() res: Response) {
        try {
            const trabajo = await this.tareaServices.trabajo_usuario_inst(sub, datos)
            return res.status(HttpStatus.OK).json({
                exito: true,
                mensajeError: '',
                mensaje: '',
                _trabajo: trabajo
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

    @Put('/tarea-status-update')
    @ApiOperation(
        {
            summary: "Edita el estado de la tarea de un trabajo.",
            description: `
                Types
                {
                    "_trabajo": Trabajo,
                    "exito": boolean,
                    "mensajeError": string,
                    "mensaje": string
                }
        
                Description
                {    
                    _trabajo: Lista trabajo
                    exito: Indicador de éxito  
                    mensajeError: Mensaje de error,
                    mensaje: Mensaje
                } 
                `
        }
    )
    async trabajo_tarea_usuario_upd_estado(@Body() datos: TareaUpdateStatuDto, @User('sub') sub: string, @Res() res: Response) {
        try {
            const trabajo = await this.tareaServices.trabajo_tarea_usuario_upd_estado(sub, datos)
            return res.status(HttpStatus.OK).json({
                exito: true,
                mensajeError: '',
                mensaje: '',
                _trabajo: trabajo
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

    @Put('/trabajo-update')
    @ApiOperation(
        {
            summary: "Edita el trabajo.",
            description: `
                Types
                {
                    "_trabajo": Trabajo,
                    "exito": boolean,
                    "mensajeError": string,
                    "mensaje": string
                }
        
                Description
                {    
                    _trabajo: Lista trabajo
                    exito: Indicador de éxito  
                    mensajeError: Mensaje de error,
                    mensaje: Mensaje
                } 
                `
        }
    )
    async trabajo_usuario_upd(@Body() datos: TrabajoUpdateDto, @User('sub') sub: string, @Res() res: Response) {
        try {
            const trabajo = await this.tareaServices.trabajo_usuario_upd(sub, datos)
            return res.status(HttpStatus.OK).json({
                exito: true,
                mensajeError: '',
                mensaje: '',
                _trabajo: trabajo
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

    @Delete('/trabajo-delete/:id')
    @ApiOperation(
        {
            summary: "Elimina trabajo",
            description: `
                Types
                {
                    "_trabajo": Trabajos,
                    "exito": boolean,
                    "mensajeError": string,
                    "mensaje": string
                }
        
                Description
                {    
                    _trabajo: Lista trabajo eliminado
                    exito: Indicador de éxito  
                    mensajeError: Mensaje de error,
                    mensaje: Mensaje
                } 
                `
        }
    )
    async trabajo_usuario_dlt(@Param('id') id: string, @Res() res: Response, @User('sub') sub: string) {
        try {
            const trabajo = await this.tareaServices.trabajo_usuario_dlt(sub, id)
            return res.status(HttpStatus.OK).json({
                exito: true,
                mensajeError: '',
                mensaje: '',
                _trabajo: trabajo
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
