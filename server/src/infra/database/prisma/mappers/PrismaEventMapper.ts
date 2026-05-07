import { Event } from "src/modules/Event/entities/Event";
import { Event as EventRaw } from "@prisma/client";

export class PrismaEventMapper {
    static toPrisma(event: Event): EventRaw {
        return {
            eve_id: event.get_id,
            eve_name: event.get_nome,
            eve_date: event.get_dataAndTime,
            eve_desc: event.get_desc,
            eve_price: event.get_price,
            eve_point: event.get_point,
            eve_start: event.get_dataAndTime,
            eve_participants: event.get_participants,
            eve_max_participants: event.get_maxParticipants,
            eve_icon: event.get_icon,
            end_id: event.get_endId,
        }
    }

    static toDomain(events: EventRaw[]): Event[] {
        return events.map(event => new Event(
            {
                eve_nome: event.eve_name,
                eve_data_and_time: event.eve_date,
                eve_desc: event.eve_desc,
                eve_price: event.eve_price,
                eve_point: event.eve_point,
                end_id: event.end_id,
                eve_participants: event.eve_participants,
                eve_max_participants: event.eve_max_participants,
                eve_icon: event.eve_icon,
                eve_createdAt: event.eve_date,
            },
            event.eve_id
        ))
    }

    static toDomainSingle(event: EventRaw): Event {
        return new Event(
            {
                eve_nome: event.eve_name,
                eve_data_and_time: event.eve_date,
                eve_desc: event.eve_desc,
                eve_price: event.eve_price,
                eve_point: event.eve_point,
                end_id: event.end_id,
                eve_participants: event.eve_participants,
                eve_max_participants: event.eve_max_participants,
                eve_icon: event.eve_icon,
                eve_createdAt: event.eve_date,
            },
            event.eve_id
        )
    }
}
