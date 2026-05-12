import { Body, Controller, Param, Post, Get, Put, Delete, Patch } from "@nestjs/common";
import { createRegistrationUseCase } from "src/modules/Registration/useCases/createRegistrationUseCase/createRegistrationUseCase";
import { getRegistrationsUseCase } from "src/modules/Registration/useCases/getRegistrationUseCase/getRegistrationUseCase";
import { putRegistrationUseCase } from "src/modules/Registration/useCases/putRegistrationUseCase/putRegistrationUseCase";
import { createRegistrationBody } from "./dtos/createRegistrationBody";
import { putRegistrationInterface } from "src/modules/Registration/repositories/registrationRepository";
import { deleteRegistrationByIdUseCase } from "src/modules/Registration/useCases/deleteRegistrationUseCase/deleteRegistrationUseCase";
import { paymentBody } from "./dtos/paymentBody";
import { paymentRegistrationUseCase } from "src/modules/Registration/useCases/paymentRegistration/paymentRegistrationUseCase";


@Controller('registration')
export class RegistrationController {

    constructor(private createRegistration: createRegistrationUseCase, private getRegistrationUseCase: getRegistrationsUseCase, private putRegistrationUseCase: putRegistrationUseCase, private deleteRegistrationUseCase: deleteRegistrationByIdUseCase, private paymentRegistrationUseCase: paymentRegistrationUseCase) { }

    @Post('')
    async create(@Body() body: createRegistrationBody) {

        const { eve_id, reg_remain_value, reg_term_url, user_id } = body
        const user = await this.createRegistration.execute({ eve_id, user_id, reg_remain_value, reg_term_url })
        return user
    }

    @Get('/:reg_id')
    async getCongregationById(@Param('reg_id') reg_id: string) {
        const registration = await this.getRegistrationUseCase.executeById(reg_id)

        return registration
    }

    @Get()
    async getRegistrations() {
        const registrations = await this.getRegistrationUseCase.execute()
        return registrations
    }

    @Put("/:reg_id")
    async putCongregation(@Param("reg_id") reg_id, @Body() body: putRegistrationInterface){
        const putRegitration = await this.putRegistrationUseCase.execute(reg_id, body)

        return putRegitration
    }

    @Delete("/:reg_id")
    async deleteCongregation(@Param("reg_id") reg_id){
        return await this.deleteRegistrationUseCase.execute(reg_id)
    }

    @Patch("/:reg_id")
    async updateRemainValue(@Param("reg_id") reg_id: string, @Body() body: paymentBody){
        const payment = await this.paymentRegistrationUseCase.execute(reg_id, body.value)
        return payment;
    }
}