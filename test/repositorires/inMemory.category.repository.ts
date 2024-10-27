import { Category } from "../../src/domain/category/entity/Category.entity";
import { CategoryRepository } from "../../src/domain/category/repository/category.repository";

export class InMemoryCategoryRepository implements CategoryRepository {
    itens: Category[] = [];

    async create(category: Category): Promise<Category> {
        await this.itens.push(category);

        return category;
    }

    async list(): Promise<Category[]> {
        return this.itens;
    }
}