import { Body, Controller, HttpCode, InternalServerErrorException, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { CategoryDto } from "src/domain/category/dto/category.dto";
import { CreateCategoryUseCase } from "src/domain/category/use-case/create";
import { CategoryPrismaPresenter } from "src/infra/presenters/category/category.prisma.presenter";

@Controller('category')
export class CreateCategoryController {

    constructor(private readonly categoryService: CreateCategoryUseCase) { }

    @Post()
    @HttpCode(201)
    async handler(@Body() data: CategoryDto, @Res() response: Response) {
        const result = await this.categoryService.execute(data);

        if (result.isLeft()) {
            throw new InternalServerErrorException();
        }

        return response.json(CategoryPrismaPresenter.toHTTP(result.value));
    }
}