import { Either, left, right } from "src/errors/either";
import { ProductRepository } from "../repository/product.repository";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { Product } from "../entity/product.entity";
import { CategoryRepository } from "src/domain/category/repository/category.repository";

type Request = {
    description: string;
    quantity: number;
    price: number;
    categoryId: string;
}

type Response = Either<NotFoundException | BadRequestException, Product>;

export class CreateProduct {

    constructor(
        private readonly productRepository: ProductRepository,
        private readonly categoryRepository: CategoryRepository
    ) { }

    async execute(data: Request): Promise<Response> {
        const { description, quantity, price, categoryId } = data;

        const categoryExist = await this.categoryRepository.find(categoryId);

        if (!categoryExist) {
            return left(new NotFoundException('Category not found'));
        }

        if (quantity < 0 || price < 0) {
            return left(new BadRequestException('Value invalid'));
        }

        const product = Product.create(
            {
                description,
                quantity,
                price,
                categoryId
            }
        )

        const result = await this.productRepository.create(product)

        return right(result);
    }
}