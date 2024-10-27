import { Module } from "@nestjs/common";
import { CategoryRepository } from "src/domain/category/repository/category.repository";
import { CreateCategoryUseCase } from "src/domain/category/use-case/create";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateCategoryController } from "./controller/create.controller";

@Module({
    imports: [DatabaseModule],
    providers: [
        {
            provide: CreateCategoryUseCase,
            useFactory: (categorRepository: CategoryRepository) => {
                return new CreateCategoryUseCase(categorRepository);
            },
            inject: [CategoryRepository]
        }
    ],
    controllers: [CreateCategoryController]
})
export class CategoryModule { }