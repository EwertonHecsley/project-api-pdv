import Email from "../../../shared/value-object/Email";
import { InMemoryUserRepository } from "../../../../test/repositorires/inMemory.user.repository";
import { User } from "../entity/user.entity";
import { HashRepository } from "../service/hash/hash.repository";
import { EditUserUseCase } from "./edit";

describe('Teste UseCase User', () => {

    let userRepository: InMemoryUserRepository;
    let useCase: EditUserUseCase;
    let hashRepositoryMock: HashRepository;

    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        useCase = new EditUserUseCase(userRepository, hashRepositoryMock);
    });

    test('Deve editar um usuário com sucesso', async () => {

        const user = User.create(
            {
                name: 'User Teste',
                email: Email.create('email@email.com'),
                password: '1234'
            }
        )

        await userRepository.itens.push(user);

        await useCase.execute(
            {
                id: user.id.valueId,
                name: 'Novo Nome'
            }
        )

        expect(userRepository.itens[0].name).toEqual('Novo Nome');
    })

    test('Deve dar erro ao passar um ID invalido ou nao existente', async () => {

        const user = User.create(
            {
                name: 'User Teste',
                email: Email.create('email@email.com'),
                password: '1234'
            }
        )

        await userRepository.itens.push(user);

        const response = await useCase.execute(
            {
                id: 'ID_INVALIDO',
                name: 'Novo Nome'
            }
        )

        expect(response.isLeft()).toBeTruthy();
    })

})