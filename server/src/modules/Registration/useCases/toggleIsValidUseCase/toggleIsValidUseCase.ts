import { Injectable, UnauthorizedException } from "@nestjs/common";
import { registrationRepository as RegistrationRepository } from "../../repositories/registrationRepository";
import { threadCpuUsage } from "process";


@Injectable()
export class toggleIsValdUseCase {
    constructor(private registrationRepository: RegistrationRepository) {}
    
    async execute(reg_id: string) {
        const registration = await this.registrationRepository.getById(reg_id);

        if (!registration) {
            throw new Error("Inscrição não encontrada");
        }


        if (registration.get_reg_isValid === false && registration.get_reg_remain_value === 0) {
            console.log("passou")
            await this.registrationRepository.toggleIsValid(reg_id);
            
            return { message: "Ingresso validado com sucesso!" };
        } else {
            throw new UnauthorizedException(
                "Não é possível validar o Ingresso antes de terminar de pagar ou assinar o termo."
            );
        }
    }
}