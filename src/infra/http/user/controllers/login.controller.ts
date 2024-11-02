import { Body, Controller, HttpCode, Post, Req, Res } from "@nestjs/common";
import { Response, Request } from "express";
import { LoginDto } from "src/domain/user/dto/login.dto";
import { AuthUseCase } from "src/domain/user/use-case/auth";
import { Public } from "src/infra/auth/pubic";
import { UserPrismaPresenter } from "src/infra/presenters/user/user.presenter";

@Controller('login')
export class LoginController {

    constructor(private readonly authService: AuthUseCase) { }

    @Public()
    @Post()
    @HttpCode(200)
    async handler(@Body() data: LoginDto, @Req() request: Request, @Res() response: Response) {

        const result = await this.authService.execute(data);

        if (result.isLeft()) {
            throw result.value;
        }

        const { token, user } = result.value;

        request.user = { id: user.id.valueId };

        return response.json(
            {
                message: 'User is Logged',
                user: UserPrismaPresenter.toHttp(user),
                token
            }
        );
    }
}