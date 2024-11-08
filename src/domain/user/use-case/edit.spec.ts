import { EditUserUseCase } from '../use-case/edit';
import { HashRepository } from '../service/hash/hash.repository';
import { NotFoundException } from '@nestjs/common';
import Email from '../../../shared/value-object/Email';
import { User } from '../entity/user.entity';
import { InMemoryUserRepository } from 'test/repositorires/inMemory.user.repository';

describe('EditUserUseCase', () => {
    let userRepositoryMock: Partial<InMemoryUserRepository>;
    let hashRepositoryMock: Partial<HashRepository>;
    let editUserUseCase: EditUserUseCase;
    let user: User;

    beforeEach(() => {
        userRepositoryMock = {
            find: jest.fn(),
            findByEmail: jest.fn(),
            save: jest.fn(),
        };
        hashRepositoryMock = {
            hash: jest.fn().mockResolvedValue('hashed-password'),
        };
        editUserUseCase = new EditUserUseCase(userRepositoryMock as InMemoryUserRepository, hashRepositoryMock as HashRepository);


        user = {
            id: 'user-id',
            name: 'Ewerton',
            email: Email.create('ewerton@gmail.com'),
            password: 'hashed-password',
        } as unknown as User;
    });

    test('deve editar um usuário com sucesso', async () => {
        const id = 'user-id';
        const newName = 'New Name';
        const newEmail = 'newemail@example.com';
        const newPassword = 'newpassword';

        userRepositoryMock.find(id);
        userRepositoryMock.save(user);

        const result = await editUserUseCase.execute({
            id,
            name: newName,
            email: newEmail,
            password: newPassword,
        });

        expect(result.isRigth()).toBe(true);
        expect(result.value).toBe(true);
        expect(userRepositoryMock.find).toHaveBeenCalledWith(id);
        expect(hashRepositoryMock.hash).toHaveBeenCalledWith(newPassword);
        expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(newEmail);
        expect(userRepositoryMock.save).toHaveBeenCalledWith(user);
        expect(user.name).toBe(newName);
        expect(user.email.value).toBe(newEmail);
        expect(user.password).toBe('hashed-password'); // A senha deve estar hashada
    });

    test('deve falhar ao editar um usuário que não existe', async () => {
        const id = 'nonexistent-id';

        userRepositoryMock.find(null);

        const result = await editUserUseCase.execute({
            id,
            name: 'New Name',
            email: 'newemail@example.com',
            password: 'newpassword',
        });

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(NotFoundException);
        expect(userRepositoryMock.find).toHaveBeenCalledWith(id);
        expect(hashRepositoryMock.hash).not.toHaveBeenCalled();
        expect(userRepositoryMock.findByEmail).not.toHaveBeenCalled();
        expect(userRepositoryMock.save).not.toHaveBeenCalled();
    });
});
