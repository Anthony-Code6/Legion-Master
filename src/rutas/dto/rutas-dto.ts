import { ApiProperty } from "@nestjs/swagger";

export class RutasDto {
    idRutas: string;
    ruta: string;
    icon: string;
}


export class RutasCreateDto {
    @ApiProperty({ example: '' })
    ruta: string;

    @ApiProperty({ example: '' })
    icon: string;
}


export class RutasUpdateDto {
    @ApiProperty({ example: '' })
    idRutas: string;

    @ApiProperty({ example: '' })
    ruta: string;

    @ApiProperty({ example: '' })
    icon: string;
}

