import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ProductDto {

    @IsString()
    @IsNotEmpty({ message: 'Description is not empty' })
    description: string;

    @IsNumber()
    @IsNotEmpty({ message: 'Quantity is not empty' })
    quantity: number;

    @IsNumber()
    @IsNotEmpty({ message: 'Price is not empty' })
    price: number;

    @IsString()
    @IsNotEmpty({ message: 'Category ID is not empty' })
    categoryId: string;
}