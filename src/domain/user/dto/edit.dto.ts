import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional } from "class-validator";

export class EditUserDto {

    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Name is not empty' })
    name: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Email is not empty' })
    @IsEmail({}, { message: 'Format email invalid' })
    email: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Password is not empty' })
    @MinLength(4, { message: 'Min length 4 characters' })
    password: string;
}