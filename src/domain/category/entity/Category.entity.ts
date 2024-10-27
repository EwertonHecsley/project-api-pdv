import Entity from "src/core/generics/Entity";
import Identity from "src/core/generics/Identity";

type CategoryType = {
    description: string;
}

export class Category extends Entity<CategoryType> {

    static create(data: CategoryType, id?: Identity): Category {
        return new Category(
            {
                ...data
            },
            id
        )
    }

    get description() {
        return this.attributes.description;
    }

    set description(value: string) {
        this.attributes.description = value;
    }
}