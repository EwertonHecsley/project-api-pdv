import { Body, Controller, HttpCode, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { LoginDto } from "src/domain/user/dto/login.dto";
import { AuthUseCase } from "src/domain/user/use-case/auth";
import { UserPrismaPresenter } from "src/infra/presenters/user/user.presenter";

@Controller('login')
export class LoginController {

    constructor(private readonly authService: AuthUseCase) { }

    @Post()
    @HttpCode(200)
    async handler(@Body() data: LoginDto, @Res() response: Response) {
        const result = await this.authService.execute(data);

        if (result.isLeft()) {
            throw result.value;
        }

        const { token, user } = result.value;

        return response.json(
            {
                message: 'User is Logged',
                user: UserPrismaPresenter.toHttp(user),
                token
            }
        );
    }
}