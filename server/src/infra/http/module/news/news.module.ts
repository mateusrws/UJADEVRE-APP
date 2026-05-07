import { Module } from "@nestjs/common";
import { DataBaseModule } from "src/infra/database/database.module";
import { NewsController } from "./news.controller";
import { createNewsUseCase } from "src/modules/News/useCases/CreateNewsUseCase/createNewsUseCase";
import { getNewsUseCase } from "src/modules/News/useCases/GetNewsUseCase/getNewsUseCase";

@Module({
    imports: [DataBaseModule],
    controllers: [NewsController],
    providers: [createNewsUseCase, getNewsUseCase]
})
export class NewsModule { }