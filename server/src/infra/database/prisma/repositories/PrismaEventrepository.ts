import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";
import { PrismaUserMapper } from "../mappers/PrismaUserMapper";
import { eventRepository } from "src/modules/Event/repositories/eventRepository";
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
}