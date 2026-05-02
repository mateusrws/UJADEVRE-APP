import { News } from "../entities/News";

export abstract class newsRepository{
    abstract create(congrtegation: News): Promise<void>;
}