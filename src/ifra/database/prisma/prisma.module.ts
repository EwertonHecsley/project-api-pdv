import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { CategoryRepository } from "src/domain/category/repository/category.repository";
import { CategoryPrismaRepository } from "../repositories/category.prisma.repository";

@Module({
    providers: [
        PrismaService,
        { provide: CategoryRepository, useClass: CategoryPrismaRepository }
    ],
    exports: [PrismaService, CategoryRepository]
})
export class PrismaModule { }