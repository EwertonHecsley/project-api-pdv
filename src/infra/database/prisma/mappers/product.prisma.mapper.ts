import { Product as ProductDatabase } from "@prisma/client";
import Identity from "src/core/generics/Identity";
import { Product } from "src/domain/product/entity/product.entity";

export class ProductPrismaMapper {

    static toDomain(entity: ProductDatabase): Product {
        return Product.create(
            {
                description: entity.description,
                quantity: entity.quantity,
                price: entity.price,
                categoryId: entity.categoryId
            },
            new Identity(entity.id)
        )
    }

    static toDatabase(entity: Product): ProductDatabase {
        return {
            id: entity.id.valueId,
            description: entity.description,
            quantity: entity.quantity,
            price: entity.price,
            categoryId: entity.categoryId
        }
    }
}