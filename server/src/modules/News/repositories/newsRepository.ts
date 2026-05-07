import { News } from "../entities/News";

export abstract class newsRepository {
    abstract create(news: News): Promise<void>;
    abstract get(): Promise<News[]>;
    abstract getById(new_id: string): Promise<News | null>;
}
