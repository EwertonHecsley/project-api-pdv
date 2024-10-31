import { Module } from "@nestjs/common";
import { UserRepository } from "src/domain/user/repository/user.repository";
import { CreateUser_UseCase } from "src/domain/user/use-case/create";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateUserController } from "./controllers/create.controller";
import { HashRepository } from "src/domain/user/service/hash/hash.repository";
import { CryptoModule } from "src/infra/crypto/crypto.module";

@Module({
    imports: [DatabaseModule, CryptoModule],
    providers: [
        {
            provide: CreateUser_UseCase,
            useFactory: (
                userRepository: UserRepository,
                hashRepository: HashRepository
            ) => {
                return new CreateUser_UseCase(userRepository, hashRepository)
            },
            inject: [UserRepository, HashRepository]
        }
    ],
    controllers: [CreateUserController]
})
export class UserModule { }