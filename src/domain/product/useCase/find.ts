import { Either, left, right } from "src/errors/either";
import { ProductRepository } from "../repository/product.repository";
import { NotFoundException } from "@nestjs/common";
import { Product } from "../entity/product.entity";

type Response = Either<NotFoundException, Product>;

export class FindProductUseCase {

    constructor(private readonly productRepository: ProductRepository) { }

    async execute(id: string): Promise<Response> {
        const product = await this.productRepository.find(id);

        if (!product) {
            return left(new NotFoundException('Product not found'));
        }

        return right(product);
    }
}