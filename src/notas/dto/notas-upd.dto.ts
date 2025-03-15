import { ApiProperty } from "@nestjs/swagger";

export class NotasUpdDto {
    @ApiProperty({ example: '' })
    idNotas: string;

    @ApiProperty({ example: '' })
    titulo: string;

    @ApiProperty({ example: '' })
    nota: string;
}