import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { AdministradorService } from './administrador.service';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('administrador')
export class AdministradorController {
    constructor(private readonly adminServices: AdministradorService,
    ) { }

    
}
