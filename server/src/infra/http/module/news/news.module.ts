import { Module } from "@nestjs/common";
import { DataBaseModule } from "src/infra/database/database.module";
import { NewsController } from "./news.controller";
import { createNewsUseCase } from "src/modules/News/useCases/CreateNewsUseCase/createNewsUseCase";
import { getNewsUseCase } from "src/modules/News/useCases/GetNewsUseCase/getNewsUseCase";
import { putNewsUseCase } from "src/modules/News/useCases/putNewsUseCase/putNewsUseCase";
import { deleteNewsByIdUseCase } from "src/modules/News/useCases/deleteNewsUseCase/deleteNewsUseCase";

@Module({
    imports: [DataBaseModule],
    controllers: [NewsController],
    providers: [createNewsUseCase, getNewsUseCase, putNewsUseCase, deleteNewsByIdUseCase]
})
export class NewsModule { }