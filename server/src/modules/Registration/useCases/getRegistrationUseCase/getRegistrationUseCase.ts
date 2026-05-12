import { Inject, Injectable } from "@nestjs/common"
import { registrationRepository } from "../../repositories/registrationRepository"
import { Registration } from "../../entities/Registration"


interface GetManyRegistratinos{
    userId: string,
    page?: string,
    perPage?: string
}
 
@Injectable()
export class getRegistrationsUseCase{
    constructor(@Inject(registrationRepository) private registrationRepository: registrationRepository){}

    async executeMyRegistrations({ userId, page, perPage} : GetManyRegistratinos): Promise<Registration[]>{

        const DEFAULT_PAGE = 1;
        const DEFAULT_PER_PAGE = 20;

        const currentPage = Number(page) || DEFAULT_PAGE;
        const currentePerPage = Number(perPage) || DEFAULT_PER_PAGE;

        const registrations = await this.registrationRepository.getMyRegistrations(userId, currentPage, currentePerPage)
        return registrations
    }

    async execute():Promise<Registration[]>{
        const registrations = await this.registrationRepository.get()
        return registrations
    }

    async executeById(reg_id: string): Promise<Registration | undefined>{
        const registration = await this.registrationRepository.getById(reg_id)

        if(!registration) return undefined

        return registration
    }
}