import { Injectable } from "@nestjs/common"
import { ifAddressExist } from "src/utils/ifAddressExist"
import { putRegistrationInterface, registrationRepository } from "../../repositories/registrationRepository"

@Injectable()
export class putRegistrationUseCase {
    constructor(private registrationRepository: registrationRepository) { }

    async execute(reg_id: string,registrationReceived: putRegistrationInterface) {
        
        const registration = await this.registrationRepository.getById(reg_id)

        if(!registration) return "Ingresso não encontrado"

        return await this.registrationRepository.update(reg_id,registrationReceived)
    }
}