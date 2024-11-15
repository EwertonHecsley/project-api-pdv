import { BadRequestException, NotFoundException } from "@nestjs/common";
import { Either, left, right } from "../../../errors/either";
import { ProductRepository } from "../repository/product.repository";
import { CategoryRepository } from "../../category/repository/category.repository";

type Request = {
    id: string;
    description: string;
    quantity: number;
    price: number;
    categoryId: string;
}

type Response = Either<NotFoundException | BadRequestException, boolean>;

export class EditProductUseCase {

    constructor(
        private readonly productRepository: ProductRepository,
        private readonly categoryRepository: CategoryRepository
    ) { }

    async execute(dataProduct: Request): Promise<Response> {
        const { id, description, price, quantity, categoryId } = dataProduct;

        const productExist = await this.productRepository.find(id);

        if (!productExist) {
            return left(new NotFoundException(`Product ${id} not found`));
        }

        const categoryExist = await this.categoryRepository.find(categoryId);

        if (!categoryExist) {
            return left(new NotFoundException('Category not found'));
        }

        if (price < 0) {
            return left(new BadRequestException(`Price invalid`));
        }

        if (quantity < 0) {
            return left(new BadRequestException(`Quantity invalid`));
        }

        productExist.description = description;
        productExist.price = price;
        productExist.quantity = quantity;
        productExist.categoryId = categoryId;

        await this.productRepository.save(productExist);

        return right(true);
    }
}