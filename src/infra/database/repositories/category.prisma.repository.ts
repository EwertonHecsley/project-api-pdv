import { CategoryRepository } from "src/domain/category/repository/category.repository";
import { PrismaService } from "../prisma/prisma.service";
import { Category } from "src/domain/category/entity/Category.entity";
import { CategoryPrismaMappers } from "../prisma/mappers/category.prisma.mappers";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CategoryPrismaRepository implements CategoryRepository {

    constructor(private readonly prismaService: PrismaService) { }

    async create(categoryData: Category): Promise<Category> {

        const data = CategoryPrismaMappers.toDatabase(categoryData);

        const category = await this.prismaService.category.create({ data });

        return CategoryPrismaMappers.toDomain(category);
    }

    async list(): Promise<Category[]> {
        const list = await this.prismaService.category.findMany();

        return list.map(CategoryPrismaMappers.toDomain);
    }

    async find(id: string): Promise<Category> {
        const category = await this.prismaService.category.findUnique({ where: { id }, include: { product: true } });

        return category ? CategoryPrismaMappers.toDomain(category) : null;
    }
}