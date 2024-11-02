import { Controller, Get, HttpCode, HttpStatus, Param, Res } from "@nestjs/common";
import { Response } from "express";
import { FindUserUseCase } from "src/domain/user/use-case/find";
import { UserPrismaPresenter } from "src/infra/presenters/user/user.presenter";

@Controller('user')
export class FindUserController {

    constructor(private readonly userService: FindUserUseCase) { }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async handler(@Param('id') id: string, @Res() response: Response) {
        const result = await this.userService.execute({ id });

        if (result.isLeft()) {
            throw result.value;
        }

        return response.json(UserPrismaPresenter.toHttp(result.value));
    }
}