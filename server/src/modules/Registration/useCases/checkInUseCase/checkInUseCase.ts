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
        // 1. Get registration
        const registration = await this.registrationRepository.getById(reg_id);
        if (!registration) {
            throw new NotFoundException("Inscrição não encontrada");
        }

        // 2. Check if already checked in
        if (registration.get_reg_isValid) {
            throw new BadRequestException("Check-in já realizado para esta inscrição");
        }

        // 3. Check if payment is complete
        if (registration.get_reg_remain_value > 0) {
            throw new BadRequestException("Pagamento pendente. Complete o pagamento antes do check-in.");
        }

        // 4. Get event to retrieve points
        const event = await this.getEventUseCase.executeById(registration.get_eve_id);

        // 5. Get user to update points
        const user = await this.userRepository.getById(registration.get_user_id);
        if (!user) {
            throw new NotFoundException("Usuário não encontrado");
        }

        // 6. Perform check-in (toggle isValid)
        await this.registrationRepository.toggleIsValid(reg_id);

        // 7. Add event points to user
        const newPoints = user.get_user_point + event.eve_point;
        await this.userRepository.put(user.get_user_id, {
            user_point: newPoints
        });

        return {
            message: "Check-in realizado com sucesso!",
            points_added: event.eve_point,
            new_total_points: newPoints,
            user_name: user.get_user_name,
            event_name: event.eve_nome
        };
    }
}
