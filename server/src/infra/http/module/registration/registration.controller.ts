import { Body, Controller, Param, Post, Get, Put, Delete, Patch } from "@nestjs/common";
import { createRegistrationUseCase } from "src/modules/Registration/useCases/createRegistrationUseCase/createRegistrationUseCase";
import { getRegistrationsUseCase } from "src/modules/Registration/useCases/getRegistrationUseCase/getRegistrationUseCase";
import { putRegistrationUseCase } from "src/modules/Registration/useCases/putRegistrationUseCase/putRegistrationUseCase";
import { createRegistrationBody } from "./dtos/createRegistrationBody";
import { putRegistrationInterface } from "src/modules/Registration/repositories/registrationRepository";
import { deleteRegistrationByIdUseCase } from "src/modules/Registration/useCases/deleteRegistrationUseCase/deleteRegistrationUseCase";
import { paymentBody } from "./dtos/paymentBody";
import { paymentRegistrationUseCase } from "src/modules/Registration/useCases/paymentRegistration/paymentRegistrationUseCase";
import { toggleIsValdUseCase } from "src/modules/Registration/useCases/toggleIsValidUseCase/toggleIsValidUseCase";
import { Registration } from "src/modules/Registration/entities/Registration";
import { checkInUseCase } from "src/modules/Registration/useCases/checkInUseCase/checkInUseCase";


@Controller('registration')
export class RegistrationController {

    constructor(
        private createRegistration: createRegistrationUseCase,
        private getRegistrationUseCase: getRegistrationsUseCase,
        private putRegistrationUseCase: putRegistrationUseCase,
        private deleteRegistrationUseCase: deleteRegistrationByIdUseCase,
        private paymentRegistrationUseCase: paymentRegistrationUseCase,
        private toggleIsValidUseCase: toggleIsValdUseCase,
        private checkInUseCase: checkInUseCase
    ) { }

    @Post('')
    async create(@Body() body: createRegistrationBody) {

        const { eve_id, reg_term_url, user_id } = body
        const registration = await this.createRegistration.execute({ eve_id, user_id, reg_term_url })

        // Normalize the response to plain object
        return {
            reg_id: registration.get_reg_id,
            eve_id: registration.get_eve_id,
            user_id: registration.get_user_id,
            reg_remain_value: registration.get_reg_remain_value,
            reg_term_url: registration.get_reg_term_url,
            reg_is_valid: registration.get_reg_isValid,
        }
    }

    @Get('/:reg_id')
    async getCongregationById(@Param('reg_id') reg_id: string) {
        const registration = await this.getRegistrationUseCase.executeById(reg_id)

        if (!registration) return null

        return {
            reg_id: registration.get_reg_id,
            eve_id: registration.get_eve_id,
            user_id: registration.get_user_id,
            reg_remain_value: registration.get_reg_remain_value,
            reg_term_url: registration.get_reg_term_url,
            reg_is_valid: registration.get_reg_isValid,
        }
    }

    @Get()
    async getRegistrations() {
        const registrations = await this.getRegistrationUseCase.execute()

        // Normalize all registrations to plain objects
        return registrations.map(r => ({
            reg_id: r.get_reg_id,
            eve_id: r.get_eve_id,
            user_id: r.get_user_id,
            reg_remain_value: r.get_reg_remain_value,
            reg_term_url: r.get_reg_term_url,
            reg_is_valid: r.get_reg_isValid,
        }))
    }

    @Put("/:reg_id")
    async putCongregation(@Param("reg_id") reg_id, @Body() body: putRegistrationInterface) {
        const result = await this.putRegistrationUseCase.execute(reg_id, body)

        if (typeof result === 'string') {
            return { message: result }
        }

        // TypeScript now knows result is Registration
        const registration = result as Registration
        return {
            reg_id: registration.get_reg_id,
            eve_id: registration.get_eve_id,
            user_id: registration.get_user_id,
            reg_remain_value: registration.get_reg_remain_value,
            reg_term_url: registration.get_reg_term_url,
            reg_is_valid: registration.get_reg_isValid,
        }
    }

    @Delete("/:reg_id")
    async deleteCongregation(@Param("reg_id") reg_id) {
        return await this.deleteRegistrationUseCase.execute(reg_id)
    }

    @Patch("/:reg_id")
    async updateRemainValue(@Param("reg_id") reg_id: string, @Body() body: paymentBody) {
        const payment = await this.paymentRegistrationUseCase.execute(reg_id, body.value)
        return payment;
    }
    @Patch('term/:reg_id')
    async toggleIsVald(@Param("reg_id") reg_id: string) {
        const result = await this.toggleIsValidUseCase.execute(reg_id)
    }

    @Post('checkin/:reg_id')
    async checkIn(@Param("reg_id") reg_id: string) {
        return await this.checkInUseCase.execute(reg_id)
    }
}