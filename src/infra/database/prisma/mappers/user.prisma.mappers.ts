import { User as UserDatabase } from "@prisma/client";
import Identity from "src/core/generics/Identity";
import { User } from "src/domain/user/entity/user.entity";
import Email from "src/shared/value-object/Email";

export class UserPrismaMapper {

    static toDomain(entity: UserDatabase): User {
        return User.create(
            {
                name: entity.name,
                email: Email.create(entity.email),
                password: entity.password
            },
            new Identity(entity.id)
        )
    }

    static toDatabase(entity: User): UserDatabase {
        return {
            id: entity.id.valueId,
            name: entity.name,
            email: entity.email.value,
            password: entity.password
        }
    }
}