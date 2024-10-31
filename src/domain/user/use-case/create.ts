import { Either, left, right } from "../../../errors/either";
import { UserRepository } from "../repository/user.repository";
import { BadRequestException } from "@nestjs/common";
import { User } from "../entity/user.entity";
import Email from "../../../shared/value-object/Email";
import { HashRepository } from "../service/hash/hash.repository";

type Request = {
    name: string;
    email: string;
    password: string;
}

type Response = Either<BadRequestException, User>;

export class CreateUser_UseCase {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly hashRepository: HashRepository
    ) { }

    async execute(user: Request): Promise<Response> {
        const emailExist = await this.userRepository.findByEmail(user.email);

        if (emailExist) {
            return left(new BadRequestException(`User ${user.email} already exists`));
        }

        const EMAIL = Email.create(user.email);

        if (!EMAIL.validate()) {
            return left(new BadRequestException(`Invalid email format`));
        }

        const hashPassword = await this.hashRepository.hash(user.password);

        const newUser = User.create(
            {
                name: user.name,
                email: EMAIL,
                password: hashPassword
            }
        )

        const dataUSer = await this.userRepository.create(newUser);

        return right(dataUSer);
    }
}