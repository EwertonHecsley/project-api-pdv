import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { CategoryRepository } from "src/domain/category/repository/category.repository";
import { CategoryPrismaRepository } from "../repositories/category.prisma.repository";
import { UserRepository } from "src/domain/user/repository/user.repository";
import { UserPrismaRepository } from "../repositories/user.prisma.repository";
import { ProductRepository } from "src/domain/product/repository/product.repository";
import { ProductPrismaRepository } from "../repositories/product.prisma.repository";

@Module({
    providers: [
        PrismaService,
        { provide: CategoryRepository, useClass: CategoryPrismaRepository },
        { provide: UserRepository, useClass: UserPrismaRepository },
        { provide: ProductRepository, useClass: ProductPrismaRepository }
    ],
    exports: [PrismaService, CategoryRepository, UserRepository, ProductRepository]
})
export class PrismaModule { }