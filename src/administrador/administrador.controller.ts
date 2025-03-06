import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { AdministradorService } from './administrador.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthGuard } from 'src/core/guards/auth/auth.guard';
import { RolesGuard } from 'src/core/guards/roles-auth/roles-auth.guard';
import { User } from 'src/core/decorator/user/user.decorator';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('administrador')
export class AdministradorController {
    constructor(private readonly adminServices: AdministradorService,
    ) { }


    @Get('/admin-dashboard')
    @ApiOperation(
        {
            summary: 'Lista informacion ',
            description: `
            Types
            {
                "_tareas_trabajo": {},
                _cantidad_registros:{},
                "exito": boolean,
                "mensajeError": string,
                "mensaje": string
            }
    
            Description
            {    
                _total_tareas: Lista el total de tareas por trabajo ,
                _cantidad_registros:Lista la informacion para la grafica
                exito: Indicador de éxito  
                mensajeError: Mensaje de error,
                mensaje: Mensaje
            } 
            `
        }
    )
    async Admin_Trabajo_TotalTareas(@Res() res: Response, @User('sub') sub: string) {
        try {

            var total_trabajo_tareas = await this.adminServices.Admin_Trabajo_TotalTareas(sub)
            var cantidad_por_areas = await this.adminServices.Admin_Total_Areas(sub)
            return res.status(HttpStatus.OK).json({
                exito: true,
                mensajeError: '',
                mensaje: '',
                _tareas_trabajo: total_trabajo_tareas,
                _cantidad_registros: cantidad_por_areas
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
