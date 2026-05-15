import { Injectable } from "@nestjs/common"
import { registrationRepository } from "../../repositories/registrationRepository"
import { getEventUseCase } from "src/modules/Event/useCases/GetEventUseCase/getEventUseCase"
import { putEventUseCase } from "src/modules/Event/useCases/putEventUseCase/putEventUseCase"

@Injectable()
export class deleteRegistrationByIdUseCase {
    constructor(
        private registrationRepository: registrationRepository,
        private getEventUseCase: getEventUseCase,
        private putEventUseCase: putEventUseCase
    ) { }

    async execute(reg_id: string) {

        const registrationExist = await this.registrationRepository.getById(reg_id)

        if (!registrationExist) return "Ingresso não encontrado"

        // Get event to decrement participants
        const event = await this.getEventUseCase.executeById(registrationExist.get_eve_id)

        // Delete registration
        const result = await this.registrationRepository.delete(reg_id)

        // Decrement participants count (ensure it doesn't go below 0)
        await this.putEventUseCase.execute(registrationExist.get_eve_id, {
            eve_participants: Math.max(0, event.eve_participants - 1)
        })

        return result
    }
}