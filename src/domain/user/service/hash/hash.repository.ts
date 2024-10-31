export abstract class HashRepository {
    abstract hash(password: string): Promise<string>;
    abstract verify(password: string, hashedPassword: string): Promise<boolean>;
}