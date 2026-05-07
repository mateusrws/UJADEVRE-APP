import { News } from "../../entities/News";
import { mockNewsRepository as MockNewsRepository } from "../../repositories/mockNewsRepository";
import { getNewsUseCase as GetNewsUseCase } from "./getNewsUseCase";
import { createNewsUseCase as CreateNewsUseCase } from "../CreateNewsUseCase/createNewsUseCase";

let getNewsUseCase: GetNewsUseCase;
let createNewsUseCase: CreateNewsUseCase;
let mockNewsRepository: MockNewsRepository;

const newsTest = new News({
    new_title: "Título Teste",
    new_content: "Conteúdo Teste",
    new_icon: "icon-teste",
})

describe('Get News Tests', () => {
    beforeEach(() => {
        mockNewsRepository = new MockNewsRepository()
        getNewsUseCase = new GetNewsUseCase(mockNewsRepository)
        createNewsUseCase = new CreateNewsUseCase(mockNewsRepository)
    })

    it("Should return all news", async () => {
        expect(mockNewsRepository.news).toEqual([])

        await createNewsUseCase.execute({
            new_title: "Título Teste",
            new_content: "Conteúdo Teste",
            new_icon: "icon-teste",
        })

        const newsList = await getNewsUseCase.execute()

        expect(newsList).toHaveLength(1)
        expect(newsList[0]).toMatchObject({
            new_title: "Título Teste",
            new_content: "Conteúdo Teste",
            new_icon: "icon-teste",
        })
    })

    it("Should return news by id", async () => {
        await mockNewsRepository.create(newsTest)

        const news = await getNewsUseCase.executeById(newsTest.getId)

        expect(news).not.toBeNull()
        expect(news.new_id).toBe(newsTest.getId)
    })

    it("Should throw when news not found", async () => {
        await expect(getNewsUseCase.executeById("non-existent-id")).rejects.toThrow("News not found!")
    })
})
