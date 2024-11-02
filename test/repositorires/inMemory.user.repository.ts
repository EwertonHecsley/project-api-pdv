import { User } from "src/domain/user/entity/user.entity";
import { UserRepository } from "../../src/domain/user/repository/user.repository";

export class InMemoryUserRepository implements UserRepository {
    itens: User[] = [];

    async create(entity: User): Promise<User> {
        await this.itens.push(entity);

        return entity;
    }

    async findByEmail(email: string): Promise<User> {
        return this.itens.find(element => element.email.value === email);
    }

    async find(id: string): Promise<User> {
        const user = this.itens.find(element => element.id.valueId == id);

        return user;
    }
}