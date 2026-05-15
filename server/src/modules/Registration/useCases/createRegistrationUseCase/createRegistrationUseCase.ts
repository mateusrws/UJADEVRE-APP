import { Injectable, BadRequestException } from "@nestjs/common";
import { registrationRepository } from "../../repositories/registrationRepository";
import { Registration } from "../../entities/Registration";
import { getEventUseCase } from "src/modules/Event/useCases/GetEventUseCase/getEventUseCase";
import { putEventUseCase } from "src/modules/Event/useCases/putEventUseCase/putEventUseCase";



interface CreateRegistration {
    eve_id: string,
    user_id: string,
    reg_term_url: string
}

@Injectable()
export class createRegistrationUseCase {
    constructor(
        private registrationRepository: registrationRepository,
        private getEventUseCase: getEventUseCase,
        private putEventUseCase: putEventUseCase
    ) { }

    async execute({ eve_id, reg_term_url, user_id }: CreateRegistration) {
        const event = await this.getEventUseCase.executeById(eve_id)

        // Check if event is full
        if (event.eve_participants >= event.eve_max_participants) {
            throw new BadRequestException("Evento lotado. Não há mais vagas disponíveis.");
        }

        const registration = new Registration({
            eve_id, reg_remain_value: event.eve_price, reg_term_url, user_id
        })

        await this.registrationRepository.create(registration);

        // Increment participants count
        await this.putEventUseCase.execute(eve_id, {
            eve_participants: event.eve_participants + 1
        })

        return registration
    }
}