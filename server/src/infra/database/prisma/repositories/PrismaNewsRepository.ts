import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";
import { newsRepository, putNewsInterface } from "src/modules/News/repositories/newsRepository";
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

    async put(new_id: string, newsReceived: putNewsInterface): Promise<String> {
        const news = await this.prisma.news.update({
            where: { new_id },
            data: newsReceived
        })

        return "Notícia alterada com sucesso"
    }

    async delete(new_id: string): Promise<String> {
        const deleteNews = await this.prisma.news.delete({ where: { new_id }})

        return "Notícia deletada com sucesso"
    }
}