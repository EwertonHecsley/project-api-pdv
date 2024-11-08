import { Body, Controller, HttpCode, HttpStatus, Put, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { EditUserDto } from "src/domain/user/dto/edit.dto";
import { EditUserUseCase } from "src/domain/user/use-case/edit";

interface AuthenticateRequest extends Request {
    userId: string;
}

@Controller('user')
export class EditUserController {

    constructor(private readonly userService: EditUserUseCase) { }

    @Put()
    @HttpCode(HttpStatus.NO_CONTENT)
    async handler(@Body() data: EditUserDto, @Req() request: Request, @Res() response: Response) {

        const { userId } = request.user as AuthenticateRequest;

        const result = await this.userService.execute({ id: userId, ...data });

        if (result.isLeft()) {
            throw result.value;
        }

        return response.send();
    }
}