import { News } from "../entities/News";

export interface putNewsInterface {
    new_title: string;
    new_content: string;
    new_icon: string;
}

export abstract class newsRepository {
    abstract create(news: News): Promise<void>;
    abstract get(): Promise<News[]>;
    abstract getById(new_id: string): Promise<News | null>;
    abstract put(new_id: string, newsReceived: putNewsInterface): Promise<String>;
    abstract delete(new_id: string): Promise<String>;
}
