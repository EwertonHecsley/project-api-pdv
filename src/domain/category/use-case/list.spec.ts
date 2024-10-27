import { InMemoryCategoryRepository } from "../../../../test/repositorires/inMemory.category.repository";
import { ListCategoryUseCase } from "../use-case/list";

describe('Teste UseCase Category', () => {
    let categoryRepository: InMemoryCategoryRepository;
    let useCase: ListCategoryUseCase;

    beforeEach(() => {
        categoryRepository = new InMemoryCategoryRepository();
        useCase = new ListCategoryUseCase(categoryRepository);
    })

    test('Deve retornar uma lista de categorias', async () => {
        const categoriesList = await useCase.execute();
        expect(categoriesList.isRigth()).toBeTruthy();
    })
})