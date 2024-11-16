import { Controller, Get, HttpCode, HttpStatus, Query, Res } from "@nestjs/common";
import { Response } from "express";
import { ListAllProductsUseCase } from "src/domain/product/useCase/list";
import { ProductPresenter } from "src/infra/presenters/product/product.presenter";

@Controller('product')
export class ListProductController {

    constructor(private readonly productService: ListAllProductsUseCase) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    async handler(@Res() response: Response, @Query() categoryId?: string) {
        const result = await this.productService.execute({ categoryId });

        if (result.isLeft()) {
            throw result.value;
        }

        const products = result.value.map(ProductPresenter.toHTTP);

        return response.json(products);
    }
}