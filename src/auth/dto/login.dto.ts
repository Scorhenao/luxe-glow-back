import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({
        description: 'The email of the user',
        example: 'example@example.com',
    })
    email: string;

    @ApiProperty({
        description: 'The password of the user',
        example: 'yourPassword',
    })
    password: string;
}
