import { Injectable } from "@nestjs/common";
import { eventRepository } from "../repositories/eventRepository";
import { Event } from "../entities/Event";
import { Replace } from "src/utils/replace";

interface EventRequest{
    eve_nome: string,
    eve_data_and_time: Date,
    eve_desc: string,
    eve_price: number,
    eve_point: number,
    end_id: string,
    eve_participants: number,
    eve_max_participants: number,
    eve_icon: string,
    eve_createdAt: Date
}

type CreateEventeRequest = Replace<EventRequest, { eve_participants?: number, eve_createdAt?: Date }>


@Injectable()
export class createEventUseCase{
    constructor(private eventRepository: eventRepository){}

    

    async execute({ end_id, eve_data_and_time, eve_desc, eve_icon, eve_max_participants, eve_nome, eve_point, eve_price}: CreateEventeRequest){
        const event = new Event({ end_id, eve_data_and_time, eve_desc, eve_icon, eve_max_participants, eve_nome, eve_point, eve_price});

        await this.eventRepository.create(event);
        return event
    }

}
