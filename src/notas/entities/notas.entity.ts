import { ApiProperty } from "@nestjs/swagger";

export class Notas {
    @ApiProperty()
    idNotas: string;

    @ApiProperty()
    idUsuario: string;

    @ApiProperty({ required: false, nullable: true }) // Permitir null en API
    url?: string | null; // Aceptamos null para que coincida con Prisma

    @ApiProperty()
    titulo: string;

    @ApiProperty()
    nota: string;

    @ApiProperty()
    fecha: Date;
}
