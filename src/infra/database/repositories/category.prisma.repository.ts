import { CategoryRepository } from "src/domain/category/repository/category.repository";
import { PrismaService } from "../prisma/prisma.service";
import { Category } from "src/domain/category/entity/Category.entity";
import { CategoryPrismaMappers } from "../prisma/mappers/category.prisma.mappers";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CategoryPrismaRepository implements CategoryRepository {

    constructor(private readonly prismaservice: PrismaService) { }

    async create(categoryData: Category): Promise<Category> {

        const data = CategoryPrismaMappers.toDatabase(categoryData);

        const category = await this.prismaservice.category.create({ data });

        return CategoryPrismaMappers.toDomain(category);
    }
}