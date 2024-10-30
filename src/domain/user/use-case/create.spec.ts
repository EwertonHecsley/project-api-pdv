import { InMemoryUserRepository } from "../../../../test/repositorires/inMemory.user.repository";
import { CreateUser_UseCase } from "../use-case/create";
import { BadRequestException } from "@nestjs/common";

describe('CreateUser_UseCase', () => {
    let userRepository: InMemoryUserRepository;
    let useCase: CreateUser_UseCase;

    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        useCase = new CreateUser_UseCase(userRepository);
    });

    test('deve criar um novo usuário com sucesso', async () => {
        const request = {
            name: 'Ewerton',
            email: 'ewerton@gmail.com',
            password: '123456'
        };

        const result = await useCase.execute(request);

        expect(result.isRigth()).toBeTruthy();
        if (result.isLeft()) {
            expect(userRepository.itens[0].name).toEqual(request.name);
            expect(userRepository.itens[0].email.value).toEqual(request.email);
            expect(userRepository.itens[0].password).toEqual(request.password);
        }
    });

    test('deve falhar ao criar um usuário com email já existente', async () => {
        const existingUser = {
            name: 'Ewerton',
            email: 'ewerton@gmail.com',
            password: '123456'
        };
        await useCase.execute(existingUser);

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

    test('deve falhar ao criar um usuário com email inválido', async () => {
        const invalidEmailUser = {
            name: 'Maria',
            email: 'emailinválido',
            password: '123456'
        };
        const result = await useCase.execute(invalidEmailUser);

        expect(result.isLeft()).toBeTruthy();
        if (result.isLeft()) {
            expect(result.value).toBeInstanceOf(BadRequestException);
            expect(result.value.message).toEqual(`Invalid email format`);
        }
    });
});
