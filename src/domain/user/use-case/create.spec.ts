import { CreateUser_UseCase } from "../use-case/create";
import { InMemoryUserRepository } from "../../../../test/repositorires/inMemory.user.repository";
import { HashRepository } from "../service/hash/hash.repository";
import { BadRequestException } from "@nestjs/common";
import Email from "../../../shared/value-object/Email";
import { User } from "../entity/user.entity";

describe('CreateUser_UseCase', () => {
    let userRepository: InMemoryUserRepository;
    let useCase: CreateUser_UseCase;
    let hashRepositoryMock: Partial<HashRepository>;

    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        hashRepositoryMock = {
            hash: jest.fn().mockResolvedValue('hashed-password'),
        };
        useCase = new CreateUser_UseCase(userRepository, hashRepositoryMock as HashRepository);
    });

    test('deve criar um novo usuário com sucesso', async () => {
        const request = {
            name: 'Ewerton',
            email: 'ewerton@gmail.com',
            password: '123456'
        };

        const result = await useCase.execute(request);

        expect(result.isRigth()).toBeTruthy();
        if (result.isRigth()) {
            const user = result.value;
            expect(userRepository.itens[0].name).toEqual(user.name);
            expect(userRepository.itens[0].email.value).toEqual(user.email.value);
            expect(userRepository.itens[0].password).toEqual(user.password);
            expect(hashRepositoryMock.hash).toHaveBeenCalledWith(request.password);
        }
    });

    test('deve falhar ao criar um usuário com email já existente', async () => {

        const user =
        {
            name: 'Ewerton',
            email: 'ewerton@gmail.com',
            password: 'hashed-password'
        }

        const example = User.create({ name: user.name, email: Email.create(user.email), password: user.password });

        userRepository.itens.push(example);

        const newUser = {
            name: 'João',
            email: 'ewerton@gmail.com',
            password: '654321'
        };

        const result = await useCase.execute(newUser);

        expect(result.isLeft()).toBeTruthy();
        if (result.isLeft()) {
            expect(result.value).toBeInstanceOf(BadRequestException);
            expect(result.value.message).toEqual(`User ${newUser.email} already exists`);
        }
    });

});