import { Body, Controller, HttpCode, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { UserDto } from "src/domain/user/dto/user.dto";
import { CreateUser_UseCase } from "src/domain/user/use-case/create";
import { UserPrismaPresenter } from "src/infra/presenters/user/user.presenter";

@Controller('user')
export class CreateUserController {

    constructor(private readonly userService: CreateUser_UseCase) { }

    @Post()
    @HttpCode(201)
    async handler(@Body() dataUser: UserDto, @Res() response: Response) {
        const result = await this.userService.execute(dataUser);

        if (result.isLeft()) {
            throw new Error("Internal Server Error");
        }

        return response.json(UserPrismaPresenter.toHttp(result.value));
    }
}