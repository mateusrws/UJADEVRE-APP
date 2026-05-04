import { Event } from "../entities/Event";
import { eventRepository } from "./eventRepository";

export class mockEventRepository implements eventRepository{

    public events: Event[] = []

    async create(event: Event): Promise<void> {
        this.events.push(event);
    }

}