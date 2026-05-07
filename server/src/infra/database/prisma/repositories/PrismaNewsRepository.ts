import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";
import { eventRepository } from "src/modules/Event/repositories/eventRepository";
import { PrismaEventMapper } from "../mappers/PrismaEventMapper";
import { Event } from "src/modules/Event/entities/Event";
import { newsRepository } from "src/modules/News/repositories/newsRepository";
import { News } from "src/modules/News/entities/News";
import { PrismaNewsMapper } from "../mappers/PrismaNewsMapper";

@Injectable()
export class PrismaNewsRepository implements newsRepository {

    constructor(private prisma: PrismaService) { }

    async create(news: News): Promise<void> {
        const newsRaw = PrismaNewsMapper.toPrisma(news)
        await this.prisma.news.create({
            data: newsRaw
        })
    }

    async get(): Promise<News[]> {
        const news = await this.prisma.news.findMany()
        return PrismaNewsMapper.toDomain(news)
    }

    async getById(new_id: string): Promise<News | null> {
        const news = await this.prisma.news.findUnique({ where: { new_id } })
        if (!news) return null;
        return PrismaNewsMapper.toDomainSingle(news)
    }
}