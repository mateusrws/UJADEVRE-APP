import { NotFoundException } from "@nestjs/common";
import { Event } from "../entities/Event";
import { eventRepository, putEventInterface } from "./eventRepository";

export class mockEventRepository implements eventRepository {

    public events: Event[] = []

    async create(event: Event): Promise<void> {
        this.events.push(event);
    }

    async get(): Promise<Event[]> {
        return this.events;
    }

    async getById(eve_id: string): Promise<Event | null> {
        return this.events.find(e => e.get_id === eve_id) ?? null;
    }

    async put(eve_id: string, eventReceived: putEventInterface): Promise<String> {
        const event = this.events.find(c => c._eve_id == eve_id)

        if (!event) throw new NotFoundException("Evento não existe")

        if (eventReceived.eve_data_and_time !== undefined) event.set_dataAndTime = eventReceived.eve_data_and_time
        if (eventReceived.eve_desc !== undefined) event.set_desc = eventReceived.eve_desc
        if (eventReceived.end_id !== undefined) event.set_endId = eventReceived.end_id
        if (eventReceived.eve_icon !== undefined) event.set_icon = eventReceived.eve_icon
        if (eventReceived.eve_max_participants !== undefined) event.set_maxParticipants = eventReceived.eve_max_participants
        if (eventReceived.eve_nome !== undefined) event.set_nome = eventReceived.eve_nome
        if (eventReceived.eve_participants !== undefined) event.set_participants = eventReceived.eve_participants
        if (eventReceived.eve_point !== undefined) event.set_point = eventReceived.eve_point
        if (eventReceived.eve_price !== undefined) event.set_price = eventReceived.eve_price


        return "Evento alterado com sucesso"
    }


    async delete(eve_id: string): Promise<String> {
        const event = this.events.find(c => c._eve_id == eve_id)

        if (!event) throw new NotFoundException("Evento não existe")

        this.events.splice(this.events.indexOf(event), 1);

        return "Evento deletado com sucesso"
    }
}
