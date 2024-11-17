import { Controller, Get, HttpCode, HttpStatus, Param, Res } from "@nestjs/common";
import { Response } from "express";
import { FindProductUseCase } from "src/domain/product/useCase/find";
import { ProductPresenter } from "src/infra/presenters/product/product.presenter";

@Controller('product')
export class FindProductController {

    constructor(private readonly productService: FindProductUseCase) { }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async handler(@Param('id') id: string, @Res() response: Response) {
        const result = await this.productService.execute(id);

        if (result.isLeft()) {
            return result.value;
        }

        return response.json(ProductPresenter.toHTTP(result.value));
    }
}