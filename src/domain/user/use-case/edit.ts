import Email from "src/shared/value-object/Email";
import { UserRepository } from "../repository/user.repository";
import { HashRepository } from "../service/hash/hash.repository";
import { Either, left, right } from "src/errors/either";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { Optional } from "src/utils/types/optinonal";

type Request = {
    id: string;
    name: string;
    email: string;
    password: string;
}

type Response = Either<NotFoundException | BadRequestException, boolean>;

export class EditUserUseCase {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly hashRepository: HashRepository
    ) { }

    async execute(data: Optional<Request, 'name' | 'email' | 'password'>): Promise<Response> {
        const { id, email, name, password } = data;

        const userExist = await this.userRepository.find(id);

        if (!userExist) {
            return left(new NotFoundException(`User with id ${id} not found`));
        }

        if (name) userExist.name = name;
        if (password) userExist.password = await this.hashRepository.hash(password);

        if (email) {

            const emailExist = await this.userRepository.findByEmail(email);

            if (emailExist) {
                return left(new BadRequestException(`Email ${email} already registered`));
            }

            userExist.email = Email.create(email);

            if (!userExist.email.validate()) {
                return left(new BadRequestException(`Format email invalid`));
            }
        }

        await this.userRepository.save(userExist);

        return right(true);
    }
}