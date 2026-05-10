import { News } from "../entities/News";
import { newsRepository, putNewsInterface } from "./newsRepository";

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

    async put(new_id: string, newsReceived: putNewsInterface) {

        const index = this.news.findIndex(n => n.getId === new_id);

        this.news[index].setContent = newsReceived.new_content;
        this.news[index].setIcon = newsReceived.new_icon;
        this.news[index].setTitle = newsReceived.new_title;


        return "Notícia Alterada com sucesso"
    }

    async delete(new_id: string): Promise<String> {

        this.news.splice(this.news.findIndex(n => n.getId === new_id), 1);

        return "Notícia deletada com sucesso"
    }
}
