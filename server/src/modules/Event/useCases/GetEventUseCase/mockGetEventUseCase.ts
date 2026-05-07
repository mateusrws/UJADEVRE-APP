import { mockEventRepository as MockEventRepository } from "../../repositories/mockEventeRepository";

export class mockGetEventUseCase {
    constructor(private mockEventRepository: MockEventRepository) { }

    async execute() {
        const events = await this.mockEventRepository.get();
        return events.map(event => ({
            eve_id: event.get_id,
            eve_nome: event.get_nome,
            eve_data_and_time: event.get_dataAndTime,
            eve_desc: event.get_desc,
            eve_price: event.get_price,
            eve_point: event.get_point,
            eve_participants: event.get_participants,
            eve_max_participants: event.get_maxParticipants,
            eve_icon: event.get_icon,
        }));
    }

    async executeGet() {
        return this.mockEventRepository.get();
    }

    async executeById(eve_id: string) {
        return this.mockEventRepository.getById(eve_id);
    }
}
