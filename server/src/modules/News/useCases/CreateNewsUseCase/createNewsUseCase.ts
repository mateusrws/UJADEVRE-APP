import { Injectable } from "@nestjs/common";
import { newsRepository } from "../../repositories/newsRepository";
import { News } from "../../entities/News";

interface CreateNewsRequest {
    new_title: string;
    new_content: string;
    new_icon: string;
}


@Injectable()
export class createNewsUseCase {
    constructor(private newsRepository: newsRepository) { }



    async execute({ new_title, new_content, new_icon }: CreateNewsRequest) {
        const news = new News({ new_title, new_content, new_icon })

        await this.newsRepository.create(news);
        return news
    }

}
