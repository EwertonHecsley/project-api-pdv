import { Module } from "@nestjs/common";
import { UserRepository } from "src/domain/user/repository/user.repository";
import { CreateUser_UseCase } from "src/domain/user/use-case/create";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateUserController } from "./controllers/create.controller";
import { HashRepository } from "src/domain/user/service/hash/hash.repository";
import { CryptoModule } from "src/infra/crypto/crypto.module";
import { AuthUseCase } from "src/domain/user/use-case/auth";
import { TokenRepository } from "src/domain/user/service/token/token.repository";
import { LoginController } from "./controllers/login.controller";
import { FindUserUseCase } from "src/domain/user/use-case/find";

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
        },
        {
            provide: AuthUseCase,
            useFactory: (
                userRepository: UserRepository,
                hashRepository: HashRepository,
                jwtRepository: TokenRepository
            ) => {
                return new AuthUseCase(userRepository, hashRepository, jwtRepository)
            },
            inject: [UserRepository, HashRepository, TokenRepository]
        },
        {
            provide: FindUserUseCase,
            useFactory: (userRepository: UserRepository) => {
                return new FindUserUseCase(userRepository);
            },
            inject: [UserRepository]
        }
    ],
    controllers: [CreateUserController, LoginController]
})
export class UserModule { }