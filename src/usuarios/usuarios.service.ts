import { Injectable } from '@nestjs/common';
import { encrypt } from 'src/core/libs/encryption';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsuariosService {

    constructor(private readonly prismaServices: PrismaService) { }



}
