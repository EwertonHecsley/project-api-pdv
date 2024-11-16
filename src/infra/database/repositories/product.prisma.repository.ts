import { ProductRepository } from "../../../domain/product/repository/product.repository";
import { PrismaService } from "../prisma/prisma.service";
import { Product } from "../../../domain/product/entity/product.entity";
import { Injectable } from "@nestjs/common";
import { ProductPrismaMapper } from "../prisma/mappers/product.prisma.mapper";

@Injectable()
export class ProductPrismaRepository implements ProductRepository {

    constructor(private readonly prismaService: PrismaService) { }

    async create(entity: Product): Promise<Product> {
        const data = ProductPrismaMapper.toDatabase(entity);

        const product = await this.prismaService.product.create({ data });

        return ProductPrismaMapper.toDomain(product);
    }

    async find(id: string): Promise<Product | null> {
        const product = await this.prismaService.product.findFirst({ where: { id } });

        return product ? ProductPrismaMapper.toDomain(product) : null;
    }

    async list(category_id?: string): Promise<Product[]> {
        if (category_id) {
            const products = await this.prismaService.product.findMany({ where: { categoryId: category_id } });

            return products.map(ProductPrismaMapper.toDomain);
        }

        const products = await this.prismaService.product.findMany();

        return products.map(ProductPrismaMapper.toDomain);
    }

    async save(entity: Product): Promise<void> {
        const data = ProductPrismaMapper.toDatabase(entity);

        await this.prismaService.product.update(
            {
                where:
                {
                    id: entity.id.valueId
                },
                data
            }
        );
    }
}