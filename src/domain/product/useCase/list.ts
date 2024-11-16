import { Either, right } from "src/errors/either";
import { ProductRepository } from "../repository/product.repository";
import { BadRequestException } from "@nestjs/common";
import { Product } from "../entity/product.entity";

type Request = {
    categoryId?: string;
}

type Response = Either<BadRequestException, Product[]>;

export class ListAllProductsUseCase {

    constructor(private readonly productRepository: ProductRepository) { }

    async execute(data: Request): Promise<Response> {

        if (data.categoryId) {
            const products = await this.productRepository.list(data.categoryId);

            return right(products);
        }

        const products = await this.productRepository.list();

        return right(products);
    }
}