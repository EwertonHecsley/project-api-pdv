import { Either, left, right } from "src/errors/either";
import { UserRepository } from "../repository/user.repository";
import { NotFoundException } from "@nestjs/common";
import { User } from "../entity/user.entity";

type Request = {
    id: string;
}

type Response = Either<NotFoundException, User>;

export class FindUserUseCase {

    constructor(private readonly userRepository: UserRepository) { }

    async execute({ id }: Request): Promise<Response> {
        const user = await this.userRepository.find(id);

        if (!user) {
            return left(new NotFoundException(`User with id ${id} not found`));
        }

        return right(user);
    }
}