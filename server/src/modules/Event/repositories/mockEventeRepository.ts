import { Event } from "../entities/Event";
import { eventRepository } from "./eventRepository";

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
}
