import { Category } from "../entity/Category.entity";
import { CreateCategoryUseCase } from "./create";
import { InMemoryCategoryRepository } from "../../../../test/repositorires/inMemory.category.repository";

describe('Testes UseCase Category', () => {

    let categoryRepository: InMemoryCategoryRepository;
    let useCase: CreateCategoryUseCase;

    beforeEach(() => {
        categoryRepository = new InMemoryCategoryRepository();
        useCase = new CreateCategoryUseCase(categoryRepository);
    })

    test('Deve criar uma nova Categoria', async () => {
        const request = {
            description: "Moda"
        }

        const category = Category.create(request);

        const result = await useCase.execute(category);

        expect(result.isRigth()).toBeTruthy();
        if (result.isRigth()) {
            expect(categoryRepository.itens[0].description).toEqual(result.value.description);
        }
    })

})