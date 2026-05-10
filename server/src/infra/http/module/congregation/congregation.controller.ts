import { Body, Controller, Param, Post, Get, Put, Delete } from "@nestjs/common";
import { createCongregationUseCase } from "src/modules/Congregation/useCases/createCongregation/createCongregationUseCase";
import { CreateCongregationBody } from "./dtos/createCongregationBody";
import { getCongregationUseCase } from "src/modules/Congregation/useCases/getCongregation/getCongregationUseCase";
import { putCongregationUseCase } from "src/modules/Congregation/useCases/putCongregation/putCongregationUseCase";
import { deleteCongregationByIdUseCase } from "src/modules/Congregation/useCases/deleteCongregation/deleteCongregationUseCase";
import { putCongregationInterface } from "src/modules/Congregation/repositories/congregationRepository";

@Controller('congregation')
export class CongregationController {

    constructor(private createCongregationUseCase: createCongregationUseCase, private getCongregationUseCase: getCongregationUseCase, private putCongregationUseCase: putCongregationUseCase, private deleteCongregationUseCase: deleteCongregationByIdUseCase) { }

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
    async getCongregations() {
        const congregations = await this.getCongregationUseCase.execute()
        return congregations
    }

    @Put("/:con_id")
    async putCongregation(@Param("con_id") con_id, @Body() body: putCongregationInterface){
        const putCongregation = await this.putCongregationUseCase.execute(con_id, body)

        return putCongregation
    }

    @Delete("/:con_id")
    async deleteCongregation(@Param("con_id") con_id){
        return await this.deleteCongregationUseCase.execute(con_id)
    }
}