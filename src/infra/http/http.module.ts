import { Module } from "@nestjs/common";
import { CategoryModule } from "./category/category.module";
import { UserModule } from "./user/user.module";

@Module({
    imports: [CategoryModule, UserModule],
    exports: [CategoryModule, UserModule]
})
export class HttpModule { }