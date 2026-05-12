import { Inject, Injectable } from "@nestjs/common"
import { registrationRepository } from "../../repositories/registrationRepository"
import { Registration } from "../../entities/Registration"



 
@Injectable()
export class getRegistrationsUseCase{
    constructor(@Inject(registrationRepository) private registrationRepository: registrationRepository){}

    async execute(): Promise<Registration[]>{
        const registrations = await this.registrationRepository.get()
        return registrations
    }

    async executeById(reg_id: string): Promise<Registration | undefined>{
        const registration = await this.registrationRepository.getById(reg_id)

        if(!registration) return undefined

        return registration
    }
}