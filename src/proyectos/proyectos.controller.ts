import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ProyectosService } from './proyectos.service';
import { Response } from 'express';
import { ApiBearerAuth, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { Roles } from 'src/core/decorator/roles/roles.decorator';
import { AuthGuard } from 'src/core/guards/auth/auth.guard';
import { RolesGuard } from 'src/core/guards/roles-auth/roles-auth.guard';
import { User } from 'src/core/decorator/user/user.decorator';
import { ProyectosCreate, ProyectosUpdate } from './dto/proyectos.dto';

@Controller('proyectos')
@ApiBearerAuth()
@Roles('Usuario')
@UseGuards(AuthGuard, RolesGuard)
export class ProyectosController {
    constructor(private readonly proyectosServices: ProyectosService) { }

    @Get('proyectos-sellst')
    @ApiOperation(
        {
            summary: 'Lista proyectos del usuario',
            description: `
            Types
            {
                "_proyectos": Proyectos[],
                "exito": boolean,
                "mensajeError": string,
                "mensaje": string
            }
    
            Description
            {    
                _proyectos: Lista los proyectos del usuario 
                exito: Indicador de éxito  
                mensajeError: Mensaje de error,
                mensaje: Mensaje
            } 
            `
        }
    )
    async proyectos_usuarios_sellst(@User('sub') sub: string, @Res() res: Response) {
        try {
            const proyectos = await this.proyectosServices.proyectos_usuarios_sellst(sub);

            return res.status(HttpStatus.OK).json({
                exito: true,
                mensajeError: '',
                mensaje: '',
                _proyectos: proyectos
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

    @Post('proyectos-create')
    @ApiOperation(
        {
            summary: 'Crea proyecto del usuario',
            description: `
            Types
            {
                "_proyectos": Proyectos,
                "exito": boolean,
                "mensajeError": string,
                "mensaje": string
            }
    
            Description
            {    
                _proyectos: Lista el proyecto del usuario 
                exito: Indicador de éxito  
                mensajeError: Mensaje de error,
                mensaje: Mensaje
            } 
            `
        }
    )
    async proyectos_usuarios_inst(@User('sub') sub: string, @Body() datos: ProyectosCreate, @Res() res: Response) {
        try {
            const proyectos = await this.proyectosServices.proyectos_usuarios_inst(sub, datos);

            return res.status(HttpStatus.OK).json({
                exito: true,
                mensajeError: '',
                mensaje: '',
                _proyectos: proyectos
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

    @Put('proyectos-update')
    @ApiOperation(
        {
            summary: 'Actualiza proyecto del usuario',
            description: `
            Types
            {
                "_proyectos": Proyectos,
                "exito": boolean,
                "mensajeError": string,
                "mensaje": string
            }
    
            Description
            {    
                _proyectos: Lista el proyecto editado del usuario 
                exito: Indicador de éxito  
                mensajeError: Mensaje de error,
                mensaje: Mensaje
            } 
            `
        }
    )
    async proyectos_usuarios_upd(@User('sub') sub: string, @Body() datos: ProyectosUpdate, @Res() res: Response) {
        try {
            const proyectos = await this.proyectosServices.proyectos_usuarios_upd(sub, datos);

            return res.status(HttpStatus.OK).json({
                exito: true,
                mensajeError: '',
                mensaje: '',
                _proyectos: proyectos
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

    @Get('proyectos-search/:id')
    @ApiOperation(
        {
            summary: 'Buscar Proyecto',
            description: `
            Types
            {
                "_proyectos": Proyectos,
                "exito": boolean,
                "mensajeError": string,
                "mensaje": string
            }
    
            Description
            {    
                _proyectos: Lista el proyecto del usuario 
                exito: Indicador de éxito  
                mensajeError: Mensaje de error,
                mensaje: Mensaje
            } 
            `
        }
    )
    async proyectos_usuario_getproyecto(@Param('id') id: string, @User('sub') sub: string, @Res() res: Response) {
        try {
            const proyecto = await this.proyectosServices.proyectos_usuario_getproyecto(sub, id)

            return res.status(HttpStatus.OK).json({
                exito: true,
                mensajeError: '',
                mensaje: '',
                _proyectos: proyecto
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

    @Delete('proyectos-delete/:id')
    @ApiOperation(
        {
            summary: 'Eliminar Proyecto',
            description: `
            Types
            {
                "_proyectos": Proyectos,
                "exito": boolean,
                "mensajeError": string,
                "mensaje": string
            }
    
            Description
            {    
                _proyectos: Lista el proyecto eliminado  del usuario 
                exito: Indicador de éxito  
                mensajeError: Mensaje de error,
                mensaje: Mensaje
            } 
            `
        }
    )
    async proyectos_usuario_dlt(@Param('id') id: string, @User('sub') sub: string, @Res() res: Response) {
        try {
            const proyecto = await this.proyectosServices.proyectos_usuario_dlt(sub, id)

            return res.status(HttpStatus.OK).json({
                exito: true,
                mensajeError: '',
                mensaje: '',
                _proyectos: proyecto
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
