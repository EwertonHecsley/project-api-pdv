import { Module } from "@nestjs/common";
import { HashRepository } from "src/domain/user/service/hash/hash.repository";
import { HashService } from "./hash.service";
import { TokenRepository } from "src/domain/user/service/token/token.repository";
import { JwtTokenService } from "./jwt.service";

@Module({
    providers: [
        {
            provide: HashRepository,
            useClass: HashService
        },
        {
            provide: TokenRepository,
            useClass: JwtTokenService
        }
    ],
    exports: [HashRepository, TokenRepository]
})
export class CryptoModule { }