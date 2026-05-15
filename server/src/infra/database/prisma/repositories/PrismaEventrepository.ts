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
                eve_name: event.eve_nome ?? undefined,
                eve_date: event.eve_data_and_time ? new Date(event.eve_data_and_time) : undefined,
                eve_start: event.eve_data_and_time ? new Date(event.eve_data_and_time) : undefined,
                eve_desc: event.eve_desc ?? undefined,
                eve_price: event.eve_price ?? undefined,
                eve_point: event.eve_point ?? undefined,
                end_id: event.end_id ?? undefined,
                eve_max_participants: event.eve_max_participants ?? undefined,
                eve_participants: event.eve_participants ?? undefined,
                eve_icon: event.eve_icon ?? undefined,
            }
        });
        return "Evento alterado com sucesso"
    }

    async delete(eve_id: string): Promise<String> {
        await this.prisma.event.delete({ where: { eve_id } })
        return "Evento deletado com sucesso"
    }
}