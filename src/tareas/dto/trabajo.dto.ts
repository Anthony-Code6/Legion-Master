import { ApiProperty } from "@nestjs/swagger";
import { TareaCreateDto } from "./tarea.dto";

export class TrabajoDto {
    idTrabajos: string;
    idUsuario: string;
    url: string;
    nombre: string;
    fecha: string;
}

export class TrabajoCreateDto {
    @ApiProperty({ example: '', description: 'Nombre al area de trabajo.' })
    nombre: string;

    @ApiProperty({ type: [TareaCreateDto], description: 'Lista de todas la tareas asignadas.' })
    tareas: TareaCreateDto[]
}
