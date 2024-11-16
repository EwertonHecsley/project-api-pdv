import { BadRequestException, NotFoundException } from "@nestjs/common";
import { Either, left, right } from "../../../errors/either";
import { ProductRepository } from "../repository/product.repository";
import { CategoryRepository } from "../../category/repository/category.repository";

type Request = {
    id: string;
    description?: string;
    quantity?: number;
    price?: number;
    categoryId?: string;
}

type Response = Either<NotFoundException | BadRequestException, boolean>;

export class EditProductUseCase {

    constructor(
        private readonly productRepository: ProductRepository,
        private readonly categoryRepository: CategoryRepository
    ) { }

    async execute(dataProduct: Request): Promise<Response> {
        const productExist = await this.productRepository.find(dataProduct.id);

        if (!productExist) {
            return left(new NotFoundException(`Product ${dataProduct.id} not found`));
        }

        const categoryExist = await this.validateCategory(dataProduct.categoryId);

        if (categoryExist.isLeft()) {
            return categoryExist;
        }

        const validationResult = this.validateProductData(dataProduct);

        if (validationResult.isLeft()) {
            return validationResult;
        }

        this.updateProduct(productExist, dataProduct);

        await this.productRepository.save(productExist);

        return right(true);
    }

    private async validateCategory(categoryId?: string): Promise<Either<NotFoundException, boolean>> {
        if (categoryId) {
            const categoryExist = await this.categoryRepository.find(categoryId);

            if (!categoryExist) {
                return left(new NotFoundException('Category not found'));
            }
        }

        return right(true);
    }

    private validateProductData(dataProduct: Request): Either<BadRequestException, boolean> {
        if (dataProduct.price !== undefined && dataProduct.price < 0) {
            return left(new BadRequestException(`Price invalid`));
        }

        if (dataProduct.quantity !== undefined && dataProduct.quantity < 0) {
            return left(new BadRequestException(`Quantity invalid`));
        }

        return right(true);
    }

    private updateProduct(product: any, dataProduct: Request): void {
        if (dataProduct.price !== undefined) {
            product.price = dataProduct.price;
        }

        if (dataProduct.quantity !== undefined) {
            product.quantity = dataProduct.quantity;
        }

        if (dataProduct.description !== undefined) {
            product.description = dataProduct.description;
        }

        if (dataProduct.categoryId !== undefined) {
            product.categoryId = dataProduct.categoryId;
        }
    }
}
