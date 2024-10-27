import { Either, right } from "../../../errors/either";
import { CategoryRepository } from "../repository/category.repository";
import { Category } from "../entity/Category.entity";

type Response = Either<null, Category[]>

export class ListCategoryUseCase {

    constructor(private readonly categoryRepository: CategoryRepository) { }

    async execute(): Promise<Response> {
        const categories = await this.categoryRepository.list();

        return right(categories);
    }
}