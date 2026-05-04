import { Event } from "../entities/Event";


export abstract class eventRepository{
    abstract create(event: Event): Promise<void>;
}