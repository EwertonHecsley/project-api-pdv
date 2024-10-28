import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { CategoryRepository } from "src/domain/category/repository/category.repository";
import { CategoryPrismaRepository } from "../repositories/category.prisma.repository";
import { UserRepository } from "src/domain/user/repository/user.repository";
import { UserPrismaRepository } from "../repositories/user.prisma.repository";

@Module({
    providers: [
        PrismaService,
        { provide: CategoryRepository, useClass: CategoryPrismaRepository },
        { provide: UserRepository, useClass: UserPrismaRepository }
    ],
    exports: [PrismaService, CategoryRepository, UserRepository]
})
export class PrismaModule { }