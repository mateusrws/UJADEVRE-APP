import { mockNewsRepository as MockNewsRepository } from "../../repositories/mockNewsRepository";

export class mockGetNewsUseCase {
    constructor(private mockNewsRepository: MockNewsRepository) { }

    async execute() {
        const newsList = await this.mockNewsRepository.get();
        return newsList.map(news => ({
            new_id: news.getId,
            new_title: news.getTitle,
            new_content: news.getContent,
            new_icon: news.getIcon,
            new_createdAt: news.getDate,
        }));
    }

    async executeGet() {
        return this.mockNewsRepository.get();
    }

    async executeById(new_id: string) {
        return this.mockNewsRepository.getById(new_id);
    }
}
