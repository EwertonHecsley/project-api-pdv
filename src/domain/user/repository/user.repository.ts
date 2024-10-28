import { User } from "../entity/user.entity";

export abstract class UserRepository {
    abstract create(entity: User): Promise<User>;
}