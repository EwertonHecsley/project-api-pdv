import { IsNotEmpty, IsString } from "class-validator";

export class CategoryDto {

    @IsNotEmpty({ message: 'Category is not empty' })
    @IsString()
    description: string;
}