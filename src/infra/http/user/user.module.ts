import { Module } from "@nestjs/common";
import { UserRepository } from "src/domain/user/repository/user.repository";
import { CreateUser_UseCase } from "src/domain/user/use-case/create";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateUserController } from "./controllers/create.controller";

@Module({
    imports: [DatabaseModule],
    providers: [
        {
            provide: CreateUser_UseCase,
            useFactory: (userRepository: UserRepository) => {
                return new CreateUser_UseCase(userRepository);
            },
            inject: [UserRepository]
        }
    ],
    controllers: [CreateUserController]
})
export class UserModule { }