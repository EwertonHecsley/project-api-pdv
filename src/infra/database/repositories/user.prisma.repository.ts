import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../../domain/user/repository/user.repository";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "src/domain/user/entity/user.entity";
import { UserPrismaMapper } from "../prisma/mappers/user.prisma.mappers";

@Injectable()
export class UserPrismaRepository implements UserRepository {

    constructor(private readonly prismaService: PrismaService) { }

    async create(userData: User): Promise<User> {
        const data = UserPrismaMapper.toDatabase(userData);

        const user = await this.prismaService.user.create({ data });

        return UserPrismaMapper.toDomain(user);
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.prismaService.user.findUnique({ where: { email } });

        return user ? UserPrismaMapper.toDomain(user) : null;
    }

    async find(id: string): Promise<User> {
        const user = await this.prismaService.user.findFirst({ where: { id } });

        return user ? UserPrismaMapper.toDomain(user) : null;
    }

    async save(user: User): Promise<void> {
        await this.prismaService.user.update({ where: { id: user.id.valueId }, data: UserPrismaMapper.toDatabase(user) });
    }
}