import { ApiProperty } from "@nestjs/swagger";

export class Notas {
    idNotas: string;
    idUsuario: string;
    url?: string;
    titulo: string;
    nota: string;
    fecha: string;
}

export class NotasInstDto {
    @ApiProperty({ example: '' })
    titulo: string;

    @ApiProperty({ example: '' })
    nota: string;
}


export class NotasUpdDto {
    @ApiProperty({ example: '' })
    idNotas: string;

    @ApiProperty({ example: '' })
    titulo: string;

    @ApiProperty({ example: '' })
    nota: string;
}