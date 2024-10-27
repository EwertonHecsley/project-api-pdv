import { CategoryRepository } from "src/domain/category/repository/category.repository";
import { PrismaService } from "../prisma/prisma.service";
import { Category } from "src/domain/category/entity/Category.entity";
import { CategoryPrismaMappers } from "../prisma/mappers/category.prisma.mappers";

export class CategoryPrismaRepository implements CategoryRepository {

    constructor(private readonly prismaSevice: PrismaService) { }

    async create(categoryData: Category): Promise<Category> {
        const data = CategoryPrismaMappers.toDatabase(categoryData);

        const category = await this.prismaSevice.category.create({ data });

        return CategoryPrismaMappers.toDomain(category);
    }
}