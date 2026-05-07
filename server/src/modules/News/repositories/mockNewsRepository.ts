import { News } from "../entities/News";
import { newsRepository } from "./newsRepository";

export class mockNewsRepository implements newsRepository {

    public news: News[] = []

    async create(news: News): Promise<void> {
        this.news.push(news);
    }

    async get(): Promise<News[]> {
        return this.news;
    }

    async getById(new_id: string): Promise<News | null> {
        return this.news.find(n => n.getId === new_id) ?? null;
    }
}
