import { Module } from "@nestjs/common";
import { CategoryModule } from "./category/category.module";
import { UserModule } from "./user/user.module";
import { ProductModule } from "./product/product.module";

@Module({
    imports: [CategoryModule, UserModule, ProductModule],
    exports: [CategoryModule, UserModule, ProductModule]
})
export class HttpModule { }