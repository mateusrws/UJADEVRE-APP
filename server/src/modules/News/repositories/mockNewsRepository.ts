import { News } from "../entities/News";
import { newsRepository } from "./newsRepository";

export class mockNewsRepository implements newsRepository{

    public news: News[] = []

    async create(news: News): Promise<void> {
        this.news.push(news);
    }

}