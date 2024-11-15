import { Body, Controller, HttpCode, HttpStatus, Param, Put, Res } from "@nestjs/common";
import { Response } from "express";
import { EditProductDto } from "src/domain/product/dto/edit.dto";
import { EditProductUseCase } from "src/domain/product/useCase/edit";

@Controller('product')
export class EditProductController {

    constructor(private readonly productService: EditProductUseCase) { }

    @Put(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async handler(@Param('id') id: string, @Body() data: EditProductDto, @Res() response: Response) {
        const result = await this.productService.execute({ id, ...data });

        if (result.isLeft()) {
            throw result.value;
        }

        return response.send();
    }
}