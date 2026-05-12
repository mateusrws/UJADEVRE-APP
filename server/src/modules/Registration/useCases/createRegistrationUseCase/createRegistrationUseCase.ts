import { Injectable } from "@nestjs/common";
import { registrationRepository } from "../../repositories/registrationRepository";
import { Registration } from "../../entities/Registration";



interface CreateRegistration {
    eve_id: string,
    user_id: string,
    reg_remain_value: number,
    reg_term_url: string
}

@Injectable()
export class createRegistrationUseCase {
    constructor(private registrationRepository: registrationRepository) { }

    async execute({ eve_id, reg_remain_value, reg_term_url, user_id }: CreateRegistration) {
        const registration = new Registration({
            eve_id, reg_remain_value, reg_term_url, user_id
        })

        await this.registrationRepository.create(registration);
        return registration
    }
}