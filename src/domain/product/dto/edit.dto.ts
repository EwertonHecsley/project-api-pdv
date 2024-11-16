import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class EditProductDto {

    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Description is not empty' })
    description: string;

    @IsOptional()
    @IsNumber()
    @IsNotEmpty({ message: 'Quantity is not empty' })
    quantity: number;

    @IsOptional()
    @IsNumber()
    @IsNotEmpty({ message: 'Price is not empty' })
    price: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Category ID is not empty' })
    categoryId: string;
}