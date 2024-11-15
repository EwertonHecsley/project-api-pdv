import { Module } from "@nestjs/common";
import { CategoryRepository } from "src/domain/category/repository/category.repository";
import { ProductRepository } from "src/domain/product/repository/product.repository";
import { CreateProductUseCase } from "src/domain/product/useCase/create";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateProductController } from "./controller/create.product.controller";
import { EditProductUseCase } from "src/domain/product/useCase/edit";
import { EditProductController } from "./controller/edit.poduct.controller";

@Module({
    imports: [DatabaseModule],
    providers: [
        {
            provide: CreateProductUseCase,
            useFactory: (productRepository: ProductRepository, categoryRepository: CategoryRepository) => {
                return new CreateProductUseCase(productRepository, categoryRepository);
            },
            inject: [ProductRepository, CategoryRepository]
        },
        {
            provide: EditProductUseCase,
            useFactory: (productRepository: ProductRepository, categoryRepository: CategoryRepository) => {
                return new EditProductUseCase(productRepository, categoryRepository);
            },
            inject: [ProductRepository, CategoryRepository]
        }
    ],
    controllers: [CreateProductController, EditProductController]
})
export class ProductModule { }