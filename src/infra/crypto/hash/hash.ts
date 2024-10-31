import { HashRepository } from "src/domain/user/service/hash/hash.repository";
import bcript from "bcrypt";
import { Injectable } from "@nestjs/common";

@Injectable()
export class HashService implements HashRepository {

    async hash(password: string): Promise<string> {
        return await bcript.hash(password, 10);
    }

    async verify(password: string, hashedPassword: string): Promise<boolean> {
        return await bcript.compare(password, hashedPassword);
    }
}