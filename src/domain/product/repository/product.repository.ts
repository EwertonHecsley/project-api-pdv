import { Product } from "../entity/product.entity";

export abstract class ProductRepository {
    abstract create(entity: Product): Promise<Product>;
    abstract find(id: string): Promise<Product | null>;
    abstract save(entity: Product): Promise<void>;
}