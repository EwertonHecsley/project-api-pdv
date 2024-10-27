import { Category as CategoryDatabase } from "@prisma/client";
import Identity from "src/core/generics/Identity";
import { Category } from "src/domain/category/entity/Category.entity";

export class CategoryPrismaMappers {

    static toDomain(entityDatabase: CategoryDatabase): Category {
        return Category.create(
            {
                description: entityDatabase.description
            },
            new Identity(entityDatabase.id)
        )
    }

    static toDatabase(entity: Category): CategoryDatabase {
        return {
            id: entity.id.valueId,
            description: entity.description
        }
    }
}