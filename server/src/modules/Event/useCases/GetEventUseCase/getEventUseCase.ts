import { BadRequestException, Injectable } from "@nestjs/common";
import { eventRepository } from "../../repositories/eventRepository";

@Injectable()
export class getEventUseCase {
    constructor(private eventRepository: eventRepository) { }

    async execute() {
        const events = await this.eventRepository.get();
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

    async executeById(eve_id: string) {
        const event = await this.eventRepository.getById(eve_id);
        if (!event) throw new BadRequestException("Event not found!");
        return {
            eve_id: event.get_id,
            eve_nome: event.get_nome,
            eve_data_and_time: event.get_dataAndTime,
            eve_desc: event.get_desc,
            eve_price: event.get_price,
            eve_point: event.get_point,
            eve_participants: event.get_participants,
            eve_max_participants: event.get_maxParticipants,
            eve_icon: event.get_icon,
        };
    }
}
