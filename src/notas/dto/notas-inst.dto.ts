import { ApiProperty } from "@nestjs/swagger";

export class NotasInstDto {
    @ApiProperty({ example: '' })
    titulo: string;

    @ApiProperty({ example: '' })
    nota: string;
}
