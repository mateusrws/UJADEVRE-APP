import { Module } from "@nestjs/common";
import { DataBaseModule } from "src/infra/database/database.module";
import { createCongregationUseCase } from "src/modules/Congregation/useCases/createCongregation/createCongregationUseCase";
import { CongregationController } from "./congregation.controller";
import { getCongregationUseCase } from "src/modules/Congregation/useCases/getCongregation/getCongregationUseCase";
import { putCongregationUseCase } from "src/modules/Congregation/useCases/putCongregation/putCongregationUseCase";
import { deleteCongregationByIdUseCase } from "src/modules/Congregation/useCases/deleteCongregation/deleteCongregationUseCase";

@Module({
    imports: [DataBaseModule],
    controllers: [CongregationController],
    providers: [createCongregationUseCase, getCongregationUseCase, putCongregationUseCase, deleteCongregationByIdUseCase]
})
export class CongregationModule { }