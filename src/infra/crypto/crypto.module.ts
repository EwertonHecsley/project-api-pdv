import { Module } from "@nestjs/common";
import { HashRepository } from "src/domain/user/service/hash/hash.repository";
import { HashService } from "./hash/hash";

@Module({
    providers: [
        {
            provide: HashRepository,
            useClass: HashService
        }
    ],
    exports: [HashRepository]
})
export class CryptoModule { }