import { Body, Controller, HttpCode, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { UserDto } from "src/domain/user/dto/user.dto";
import { CreateUser_UseCase } from "src/domain/user/use-case/create";
import { Public } from "src/infra/auth/pubic";
import { UserPrismaPresenter } from "src/infra/presenters/user/user.presenter";

@Controller('user')
export class CreateUserController {

    constructor(private readonly userService: CreateUser_UseCase) { }

    @Public()
    @Post()
    @HttpCode(201)
    async handler(@Body() dataUser: UserDto, @Res() response: Response) {
        const result = await this.userService.execute(dataUser);

        if (result.isLeft()) {
            throw result.value
        }

        return response.json(UserPrismaPresenter.toHttp(result.value));
    }
}