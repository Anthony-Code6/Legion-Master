import { BadRequestException, Controller, Get, Post, Put, Delete, HttpStatus, Res, Param, Body, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { RolesService } from './roles.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { RolesCreateDto, RolesUpdateDto } from './dto/roles-dto';
import { AuthGuard } from '../core/guards/auth/auth.guard';
import { RolesGuard } from 'src/core/guards/roles-auth/roles-auth.guard';
import { Roles } from 'src/core/decorator/roles/roles.decorator';

@Controller('roles')
@ApiBearerAuth()
@Roles('Administrador')
@UseGuards(AuthGuard, RolesGuard)
export class RolesController {
    constructor(private readonly rolesServices: RolesService) { }

    @Get('/roles-list')
    @ApiOperation(
        {
            summary: "Lista roles",
            description: `
            Types
            {
                "_roles": Roles[],
                "exito": boolean,
                "mensajeError": string,
                "mensaje": string
            }
    
            Description
            {    
                _roles: Lista roles
                exito: Indicador de éxito  
                mensajeError: Mensaje de error,
                mensaje: Mensaje
            } 
            `
        }
    )
    async roles_sellst(@Res() res: Response) {
        try {

            var roles = await this.rolesServices.roles_sellst()
            return res.status(HttpStatus.OK).json({
                exito: true,
                mensajeError: '',
                mensaje: '',
                _roles: roles
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

    @Get('/roles-search/:id')
    @ApiOperation(
        {
            summary: "Buscar rol",
            description: `
            Types
            {
                "_roles": Roles,
                "exito": boolean,
                "mensajeError": string,
                "mensaje": string
            }
    
            Description
            {    
                _roles: Lista un rol
                exito: Indicador de éxito  
                mensajeError: Mensaje de error,
                mensaje: Mensaje
            } 
            `
        }
    )
    async roles_getrol(@Param('id') id: string, @Res() res: Response) {
        try {
            var roles = await this.rolesServices.roles_getrol(parseInt(id))
            return res.status(HttpStatus.OK).json({
                exito: true,
                mensajeError: '',
                mensaje: '',
                _roles: roles
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

    @Post('/roles-create')
    @ApiOperation(
        {
            summary: "Registrar rol",
            description: `
            Types
            {
                "_roles": Roles,
                "exito": boolean,
                "mensajeError": string,
                "mensaje": string
            }
    
            Description
            {    
                _roles: Lista el rol registrado
                exito: Indicador de éxito  
                mensajeError: Mensaje de error,
                mensaje: Mensaje
            } 
            `
        }
    )
    async roles_inst(@Body() datos: RolesCreateDto, @Res() res: Response) {
        try {
            var roles = await this.rolesServices.roles_inst(datos)
            return res.status(HttpStatus.OK).json({
                exito: true,
                mensajeError: '',
                mensaje: '',
                _roles: roles
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

    @Put('/roles-update')
    @ApiOperation(
        {
            summary: "Actualizar rol",
            description: `
            Types
            {
                "_roles": Roles,
                "exito": boolean,
                "mensajeError": string,
                "mensaje": string
            }
    
            Description
            {    
                _roles: Lista el rol actualizado
                exito: Indicador de éxito  
                mensajeError: Mensaje de error,
                mensaje: Mensaje
            } 
            `
        }
    )
    async roles_upd(@Body() datos: RolesUpdateDto, @Res() res: Response) {
        try {
            var roles = await this.rolesServices.roles_upd(datos)
            return res.status(HttpStatus.OK).json({
                exito: true,
                mensajeError: '',
                mensaje: '',
                _roles: roles
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

    @Delete('/roles-delete/:id')
    @ApiOperation(
        { 
            summary: "Eliminar rol" ,
            description: `
            Types
            {
                "_roles": Roles,
                "exito": boolean,
                "mensajeError": string,
                "mensaje": string
            }
    
            Description
            {    
                _roles: Lista el rol eliminado
                exito: Indicador de éxito  
                mensajeError: Mensaje de error,
                mensaje: Mensaje
            } 
            `
        }
    )
    async roles_dlt(@Param('id') id: string, @Res() res: Response) {
        try {
            var roles = await this.rolesServices.roles_dlt(parseInt(id))
            return res.status(HttpStatus.OK).json({
                exito: true,
                mensajeError: '',
                mensaje: '',
                _roles: roles
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
