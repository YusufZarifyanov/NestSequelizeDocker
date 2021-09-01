import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
        @ApiProperty({ example: 'user@mail.com', description: 'Почтовый адрес' })
        @IsString({ message: 'Надо строку' })
        @IsEmail({}, { message: 'Некорректный email' })
        readonly email: string;

        @ApiProperty({ example: '1234', description: 'Пароль' })
        @IsString({ message: 'Надо строку' })
        @Length(4, 16, { message: 'Не меньше 4 и не больше 16' })
        readonly password: string;
}
