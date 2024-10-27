import { Category } from "src/domain/category/entity/Category.entity";

export class CategoryPrismaPresenter {

    static toHTTP(category: Category) {
        return {
            id: category.id.valueId,
            description: category.description
        }
    }
}