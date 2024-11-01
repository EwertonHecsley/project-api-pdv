import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto {
    @IsString()
    @IsNotEmpty({ message: 'Email is not empty' })
    @IsEmail({}, { message: 'Format email invalid' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Password is not empty' })
    @MinLength(4, { message: 'Min length 4 characters' })
    password: string;
}