import { ApiProperty } from "@nestjs/swagger";

export class AuthLoginDto {
    @ApiProperty({example:''})
    email: string;

    @ApiProperty({example:''})
    password: string;
}

export class AuthRegisterDto {
    @ApiProperty({example:''})
    nombre:string;

    @ApiProperty({example:''})
    apellido:string;

    @ApiProperty({example:''})
    email: string;

    @ApiProperty({example:''})
    password: string;
}