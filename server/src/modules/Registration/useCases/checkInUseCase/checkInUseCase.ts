import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { registrationRepository } from "../../repositories/registrationRepository";
import { userRepository } from "src/modules/User/repositories/userRepository";
import { getEventUseCase } from "src/modules/Event/useCases/GetEventUseCase/getEventUseCase";

@Injectable()
export class checkInUseCase {
    constructor(
        private registrationRepository: registrationRepository,
        private userRepository: userRepository,
        private getEventUseCase: getEventUseCase
    ) { }

    async execute(reg_id: string) {
        const registration = await this.registrationRepository.getById(reg_id);
        if (!registration) {
            throw new NotFoundException("Inscrição não encontrada");
        }

        if (registration.get_reg_isValid) {
            throw new BadRequestException("Check-in já realizado para esta inscrição");
        }

        if (registration.get_reg_term_url == "https://ujadevre.com/termo") {
            throw new BadRequestException("O termo não foi assinado ou não foi salvo no sistema");
        }

        if (registration.get_reg_remain_value > 0) {
            throw new BadRequestException("Pagamento pendente. Complete o pagamento antes do check-in.");
        }


        const event = await this.getEventUseCase.executeById(registration.get_eve_id);


        const user = await this.userRepository.getById(registration.get_user_id);
        if (!user) {
            throw new NotFoundException("Usuário não encontrado");
        }

        await this.registrationRepository.toggleIsValid(reg_id);


        const newPoints = user.get_user_point + event.eve_point;
        await this.userRepository.put(user.get_user_id, {
            user_point: newPoints
        });

        return {
            message: "Check-in realizado com sucesso!",
            points_added: event.eve_point,
            new_total_points: newPoints,
            user_name: user.get_user_name,
            event_name: event.eve_nome,
            reg_term_url: registration.get_reg_term_url
        };
    }
}
