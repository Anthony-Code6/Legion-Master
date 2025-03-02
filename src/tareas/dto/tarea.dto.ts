import { ApiProperty } from "@nestjs/swagger";

export class TareaDto {
    idTareas: string;
    idTrabajo: string;
    tarea: string;
    orden: number;
    estado:boolean;
}

export class TareaCreateDto{
    // @ApiProperty({
    //     example:0,
    //     description:'Orden de las tareas.'
    // })
    // orden: number;
    
    @ApiProperty({
        example:'',
        description:'Descripcion de la tarea.'
    })
    tarea: string;

    @ApiProperty({
        example:false,
        description:'Estado de las tareas.'
    })
    estado: boolean;
}

export class TareaUpdateStatuDto{
    @ApiProperty({
        example:'',
        description:'Identificador de las tareas.'
    })
    idTareas: string;

    @ApiProperty({
        example:'',
        description:'Identificador del trabajo.'
    })
    idTrabajo: string;

    @ApiProperty({
        example:false,
        description:'Orden de las tareas.'
    })
    estado: boolean;
}