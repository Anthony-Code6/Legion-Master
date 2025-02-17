import { ApiProperty } from "@nestjs/swagger";

export class Proyectos {
    idProyectos: string;
    idUsuario: string;
    url?: string;
    link: string;
    titulo: string;
    descripcion: string;
    fecha?: string;
    estado: boolean;
}

export class ProyectosCreate {
    @ApiProperty({
        example: '',
        description: 'Link del Proyecto'
    })
    link: string;

    @ApiProperty({
        example: '',
        description: 'Titulo del Proyecto'
    })
    titulo: string;

    @ApiProperty({
        example: '',
        description: 'Descripcion del Proyecto'
    })
    descripcion: string;

    @ApiProperty({
        example: true,
        description: 'Estado del Proyecto {Produccion,Local}'
    })
    estado: boolean;
}

export class ProyectosUpdate{
    @ApiProperty({
        example:'',
        description:'Codigo del Proyecto'
    })
    idProyectos: string;

    @ApiProperty({
        example: '',
        description: 'Link del Proyecto'
    })
    link: string;

    @ApiProperty({
        example: '',
        description: 'Titulo del Proyecto'
    })
    titulo: string;

    @ApiProperty({
        example: '',
        description: 'Descripcion del Proyecto'
    })
    descripcion: string;

    @ApiProperty({
        example: true,
        description: 'Estado del Proyecto {Produccion,Local}'
    })
    estado: boolean;
}