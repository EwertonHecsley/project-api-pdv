import { Controller, Get, HttpCode, HttpStatus, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { FindUserUseCase } from "src/domain/user/use-case/find";
import { UserPrismaPresenter } from "src/infra/presenters/user/user.presenter";

interface AuthenticateRequest extends Request {
    userId: string;
}

@Controller('user')
export class FindUserController {

    constructor(private readonly userService: FindUserUseCase) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    async handler(@Req() request: Request, @Res() response: Response) {
        const dataUser = request.user as AuthenticateRequest;

        const result = await this.userService.execute({ id: dataUser.userId });

        if (result.isLeft()) {
            throw result.value;
        }

        return response.json(UserPrismaPresenter.toHttp(result.value));
    }
}