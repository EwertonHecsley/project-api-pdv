import { Either, left, right } from "src/errors/either";
import { UserRepository } from "../repository/user.repository";
import { HashRepository } from "../service/hash/hash.repository";
import { TokenRepository } from "../service/token/token.repository";
import { BadRequestException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { User } from "../entity/user.entity";

type Request = {
    email: string,
    password: string
}

type Response = Either<BadRequestException | NotFoundException | UnauthorizedException, { token: string, user: User }>;

export class AuthUseCase {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly hashRepository: HashRepository,
        private readonly jwtRepository: TokenRepository
    ) { }

    async execute({ email, password }: Request): Promise<Response> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            return left(new NotFoundException(`User ${email} not found`));
        }

        const isValidPassword = await this.hashRepository.verify(password, user.password);

        if (!isValidPassword) {
            return left(new UnauthorizedException(`Invalid password`));
        }

        const token = this.jwtRepository.generate({ userId: user.id.valueId, email: user.email.value });

        return right(
            {
                token,
                user
            }
        )
    }
}