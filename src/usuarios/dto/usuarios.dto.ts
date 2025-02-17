import { ApiProperty } from "@nestjs/swagger";

export class UsuariosDto {
    idUsuarios: string;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    idRol: number;
    fecha: string;
    estado: boolean;
}

export class UsuariosCreateDto {
    @ApiProperty({ example: '' })
    nombre: string;

    @ApiProperty({ example: '' })
    apellido: string;

    @ApiProperty({ example: '' })
    email: string;

    @ApiProperty({ example: '' })
    password: string;

    @ApiProperty({ example: 0 })
    idRol: number;
}


export class UsuariosUpdDto {
    @ApiProperty({ example: '' })
    idUsuarios: string;

    @ApiProperty({ example: '' })
    nombre: string;

    @ApiProperty({ example: '' })
    apellido: string;

    @ApiProperty({ example: '' })
    email: string;

    @ApiProperty({ example: '' })
    password: string;

    @ApiProperty({ example: 0 })
    idRol: number;

    @ApiProperty({ example: true })
    estado: boolean;
}


