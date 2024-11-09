import Identity from "src/core/generics/Identity";
import Entity from "../../../core/generics/Entity";

type ProductType = {
    description: string;
    quantity: number;
    price: number;
    categoryId: string;
}

export class Product extends Entity<ProductType> {

    static create(product: ProductType, id?: Identity): Product {
        return new Product({ ...product }, id)
    }

    get descripton(): string {
        return this.attributes.description;
    }

    get quantity(): number {
        return this.attributes.quantity;
    }

    get price(): number {
        return this.attributes.price;
    }

    get categoryId(): string {
        return this.attributes.categoryId;
    }

    set description(description: string) {
        this.attributes.description = description;
    }

    set quantity(quantity: number) {
        this.attributes.quantity = quantity;
    }

    set price(price: number) {
        this.attributes.price = price;
    }

    set categoryId(categoryId: string) {
        this.attributes.categoryId = categoryId;
    }
};