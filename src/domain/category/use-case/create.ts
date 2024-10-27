import { Either, right } from "src/errors/either";
import { Category } from "../entity/Category.entity";
import { CategoryRepository } from "../repository/category.repository";

type Request = {
    description: string;
}

type Response = Either<null, Category>;

export class CreateCategoryUseCase {

    constructor(private readonly categoryRepository: CategoryRepository) { }

    async execute(data: Request): Promise<Response> {
        const category = Category.create(data);

        const result = await this.categoryRepository.create(category);

        return right(result);
    }
}

