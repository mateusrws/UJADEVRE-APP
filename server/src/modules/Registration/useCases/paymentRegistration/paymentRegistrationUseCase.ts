import { Injectable } from "@nestjs/common";
import { registrationRepository } from "../../repositories/registrationRepository";
@Injectable()
export class paymentRegistrationUseCase{
    constructor(private registrationRepository: registrationRepository) { }

    async execute(reg_id, value){
        const registration = await this.registrationRepository.getById(reg_id)

        if(!registration) return "Ingresso não encontrado"

        return await this.registrationRepository.updateRemainValue(reg_id, value)
    }
}