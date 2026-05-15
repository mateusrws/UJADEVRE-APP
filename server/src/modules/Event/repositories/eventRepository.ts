import { Event } from "../entities/Event";

export interface putEventInterface {
    eve_nome?: string,
    eve_data_and_time?: Date,
    eve_desc?: string,
    eve_price?: number,
    eve_point?: number,
    end_id?: string,
    eve_max_participants?: number,
    eve_participants?: number;
    eve_icon?: string
}
export abstract class eventRepository {
    abstract create(event: Event): Promise<void>;
    abstract get(): Promise<Event[]>;
    abstract getById(eve_id: string): Promise<Event | null>;
    abstract put(eve_id: string, event: putEventInterface): Promise<String>;
    abstract delete(eve_id: string): Promise<String>;
}
