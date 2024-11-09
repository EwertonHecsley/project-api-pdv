import { Category } from "../entity/Category.entity";

export abstract class CategoryRepository {
    abstract create(category: Category): Promise<Category>;
    abstract list(): Promise<Category[]>;
    abstract find(id: string): Promise<Category>;
}