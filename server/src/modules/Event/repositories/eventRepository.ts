import { Event } from "../entities/Event";

export abstract class eventRepository {
    abstract create(event: Event): Promise<void>;
    abstract get(): Promise<Event[]>;
    abstract getById(eve_id: string): Promise<Event | null>;
}
