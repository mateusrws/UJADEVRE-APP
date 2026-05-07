import { Body, Controller, Param, Post, Get } from "@nestjs/common";
import { createCongregationUseCase } from "src/modules/Congregation/useCases/createCongregationUseCase/createCongregationUseCase";
import { CreateCongregationBody } from "./dtos/createCongregationBody";
import { getCongregationUseCase } from "src/modules/Congregation/useCases/getCongregation/getCongregationUseCase";

@Controller('congregation')
export class CongregationController {

    constructor(private createCongregationUseCase: createCongregationUseCase, private getCongregationUseCase: getCongregationUseCase) { }

    @Post('')
    async createCongregation(@Body() body: CreateCongregationBody) {

        const { con_name, end_id } = body
        const user = await this.createCongregationUseCase.execute({ con_name, end_id })
        return user
    }

    @Get('/:con_id')
    async getCongregationById(@Param('con_id') con_id: string) {
        const congregation = await this.getCongregationUseCase.executeById(con_id)

        return congregation
    }

    @Get()
    async getCongregations(){
        const congregations = await this.getCongregationUseCase.execute()
        return congregations
    }
}