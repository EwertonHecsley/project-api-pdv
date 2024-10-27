import { Controller, Get, HttpCode, InternalServerErrorException, Res } from "@nestjs/common";
import { Response } from "express";
import { ListCategoryUseCase } from "src/domain/category/use-case/list";
import { CategoryPrismaPresenter } from "src/infra/presenters/category/category.prisma.presenter";

@Controller('category')
export class ListCategoryController {

    constructor(private readonly categoryService: ListCategoryUseCase) { }

    @Get()
    @HttpCode(200)
    async handler(@Res() response: Response) {
        const list = await this.categoryService.execute();

        if (list.isLeft()) {
            throw new InternalServerErrorException();
        }

        const result = list.value.map(category => CategoryPrismaPresenter.toHTTP(category));

        return response.json(result);
    }
}