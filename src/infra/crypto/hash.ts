import { HashRepository } from "src/domain/user/service/hash/hash.repository";
import { hash, compare } from "bcrypt";
import { Injectable } from "@nestjs/common";

@Injectable()
export class HashService implements HashRepository {

    async hash(password: string): Promise<string> {
        return await hash(password, 10);
    }

    async verify(password: string, hashedPassword: string): Promise<boolean> {
        return await compare(password, hashedPassword);
    }
}