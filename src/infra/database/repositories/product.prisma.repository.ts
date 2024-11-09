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
}