import { Injectable } from "@nestjs/common"
import { registrationRepository } from "../../repositories/registrationRepository"

@Injectable()
export class deleteRegistrationByIdUseCase {
    constructor(private registrationRepository: registrationRepository) { }

    async execute(reg_id: string) {

        const registrationExist = await this.registrationRepository.getById(reg_id)

        if(!registrationExist) return "Ingresso não encontrado"
        
        return await this.registrationRepository.delete(reg_id)
    }
}