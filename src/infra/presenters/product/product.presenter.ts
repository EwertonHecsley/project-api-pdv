import { Product } from "src/domain/product/entity/product.entity";

export class ProductPresenter {

    static toHTTP(entity: Product) {
        return {
            id: entity.id.valueId,
            description: entity.description,
            quantity: entity.quantity,
            price: entity.price,
            categoryId: entity.categoryId
        }
    }
}