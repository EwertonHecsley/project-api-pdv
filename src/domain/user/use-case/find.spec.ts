import Email from "../../../shared/value-object/Email";
import { InMemoryUserRepository } from "../../../../test/repositorires/inMemory.user.repository";
import { User } from "../entity/user.entity";
import { FindUserUseCase } from "./find";




describe('Teste UseCase Planet', () => {

    let userRepository: InMemoryUserRepository;
    let useCase: FindUserUseCase;

    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        useCase = new FindUserUseCase(userRepository);
    })

    test('Deve retornar um Usuario', async () => {
        const userExample = User.create(
            {
                name: 'User Teste',
                email: Email.create('email@email.com'),
                password: '1234'
            }
        )

        await userRepository.itens.push(userExample);

        const response = await useCase.execute({ id: userExample.id.valueId });

        expect(response.isRigth()).toBeTruthy();
    })

    test('Ao passar um ID inválido, deve retornar nulo', async () => {
        const response = await useCase.execute({ id: '100' });

        expect(response.isLeft()).toBeTruthy();
    })
})