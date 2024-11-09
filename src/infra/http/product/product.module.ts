import { Module } from "@nestjs/common";
import { CategoryRepository } from "src/domain/category/repository/category.repository";
import { ProductRepository } from "src/domain/product/repository/product.repository";
import { CreateProductUseCase } from "src/domain/product/useCase/create";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateProductController } from "./controller/create.product.controller";

@Module({
    imports: [DatabaseModule],
    providers: [
        {
            provide: CreateProductUseCase,
            useFactory: (productRepository: ProductRepository, categoryRepository: CategoryRepository) => {
                return new CreateProductUseCase(productRepository, categoryRepository);
            },
            inject: [ProductRepository, CategoryRepository]
        }
    ],
    controllers: [CreateProductController]
})
export class ProductModule { }