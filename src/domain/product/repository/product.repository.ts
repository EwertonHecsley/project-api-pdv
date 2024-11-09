import { Product } from "../entity/product.entity";

export abstract class ProductRepository {
    abstract create(entity: Product): Promise<Product>;
}