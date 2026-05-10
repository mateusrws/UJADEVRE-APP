import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";
import { PrismaUserMapper } from "../mappers/PrismaUserMapper";
import { eventRepository, putEventInterface } from "src/modules/Event/repositories/eventRepository";
import { PrismaEventMapper } from "../mappers/PrismaEventMapper";
import { Event } from "src/modules/Event/entities/Event";

@Injectable()
export class PrismaEventRepository implements eventRepository {

    constructor(private prisma: PrismaService) { }

    async create(event: Event): Promise<void> {
        const eventRaw = PrismaEventMapper.toPrisma(event)
        await this.prisma.event.create({
            data: eventRaw
        })
    }

    async get(): Promise<Event[]> {
        const events = await this.prisma.event.findMany()
        return PrismaEventMapper.toDomain(events)
    }

    async getById(eve_id: string): Promise<Event | null> {
        const event = await this.prisma.event.findUnique({ where: { eve_id } })
        if (!event) return null;
        return PrismaEventMapper.toDomainSingle(event)
    }

    async put(eve_id: string, event: putEventInterface): Promise<String> {
        await this.prisma.event.update({
            where: { eve_id },
            data: {
                eve_name: event.eve_nome,
                eve_date: new Date(event.eve_data_and_time),
                eve_start: new Date(event.eve_data_and_time),
                eve_desc: event.eve_desc,
                eve_price: event.eve_price,
                eve_point: event.eve_point,
                end_id: event.end_id,
                eve_max_participants: event.eve_max_participants,
                eve_participants: event.eve_participants,
                eve_icon: event.eve_icon,
            }
        });
        return "Evento alterado com sucesso"
    }

    async delete(eve_id: string): Promise<String> {
        await this.prisma.event.delete({ where: { eve_id } })
        return "Evento deletado com sucesso"
    }
}