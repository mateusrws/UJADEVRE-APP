import { Module } from "@nestjs/common";
import { DataBaseModule } from "src/infra/database/database.module";
import { createCongregationUseCase } from "src/modules/Congregation/useCases/createCongregationUseCase/createCongregationUseCase";
import { CongregationController } from "./congregation.controller";
import { getCongregationUseCase } from "src/modules/Congregation/useCases/getCongregation/getCongregationUseCase";

@Module({
    imports: [DataBaseModule],
    controllers: [CongregationController],
    providers: [createCongregationUseCase, getCongregationUseCase]
})
export class CongregationModule { }