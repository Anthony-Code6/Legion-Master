import { ApiProperty } from "@nestjs/swagger";

export class RolesDto {
    idRoles: number;
    rol: string;
}

export class RolesCreateDto {
    @ApiProperty({ example: '' })
    rol: string;
}

export class RolesUpdateDto {
    @ApiProperty({ example: 0 })
    idRoles: number;

    @ApiProperty({ example: '' })
    rol: string;
}