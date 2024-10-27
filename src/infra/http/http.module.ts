import { Module } from "@nestjs/common";
import { CategoryModule } from "./category/category.module";

@Module({
    imports: [CategoryModule],
    exports: [CategoryModule]
})
export class HttpModule { }