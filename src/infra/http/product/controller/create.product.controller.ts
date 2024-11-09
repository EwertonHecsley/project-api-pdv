import { Body, Controller, HttpCode, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { ProductDto } from "src/domain/product/dto/produtc.dto";
import { CreateProductUseCase } from "src/domain/product/useCase/create";
import { ProductPresenter } from "src/infra/presenters/product/product.presenter";

@Controller('product')
export class CreateProductController {

    constructor(private readonly productService: CreateProductUseCase) { }

    @Post()
    @HttpCode(201)
    async handler(@Body() dataProduct: ProductDto, @Res() response: Response) {
        const result = await this.productService.execute(dataProduct);

        if (result.isLeft()) {
            throw result.value;
        }

        return response.json(ProductPresenter.toHTTP(result.value));
    }
}