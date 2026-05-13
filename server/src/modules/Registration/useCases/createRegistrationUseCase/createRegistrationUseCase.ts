import { Injectable } from "@nestjs/common";
import { registrationRepository } from "../../repositories/registrationRepository";
import { Registration } from "../../entities/Registration";
import { getEventUseCase } from "src/modules/Event/useCases/GetEventUseCase/getEventUseCase";



interface CreateRegistration {
    eve_id: string,
    user_id: string,
    reg_term_url: string
}

@Injectable()
export class createRegistrationUseCase {
    constructor(private registrationRepository: registrationRepository, private getEventUseCase: getEventUseCase) { }

    async execute({ eve_id, reg_term_url, user_id }: CreateRegistration) {
        const event = await this.getEventUseCase.executeById(eve_id)
        const registration = new Registration({
            eve_id, reg_remain_value: event.eve_price, reg_term_url, user_id
        })

        await this.registrationRepository.create(registration);
        return registration
    }
}