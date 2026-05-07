import { Injectable } from "@nestjs/common";
import { newsRepository } from "../../repositories/newsRepository";

@Injectable()
export class getNewsUseCase {
    constructor(private newsRepository: newsRepository) { }

    async execute() {
        const newsList = await this.newsRepository.get();
        return newsList.map(news => ({
            new_id: news.getId,
            new_title: news.getTitle,
            new_content: news.getContent,
            new_icon: news.getIcon,
            new_createdAt: news.getDate,
        }));
    }

    async executeById(new_id: string) {
        const news = await this.newsRepository.getById(new_id);
        if (!news) throw new Error("News not found!");
        return {
            new_id: news.getId,
            new_title: news.getTitle,
            new_content: news.getContent,
            new_icon: news.getIcon,
            new_createdAt: news.getDate,
        };
    }
}
