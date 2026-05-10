import { createNewsUseCase as CreateNewsUseCase } from "./createNewsUseCase";
import { mockNewsRepository as MockNewsRepository } from "../../repositories/mockNewsRepository";

let createNewsUseCase: CreateNewsUseCase;

let mockNewsRepository: MockNewsRepository;

describe('Create a News Tests', () => {
    beforeEach(() => {
        mockNewsRepository = new MockNewsRepository()
        createNewsUseCase = new CreateNewsUseCase(mockNewsRepository)
    })

    it("Should be able to create news", async () => {
        expect(mockNewsRepository.news).toEqual([])

        const news = await createNewsUseCase.execute({
            new_title: "test",
            new_content: "test",
            new_icon: "test"
        })

        expect(mockNewsRepository.news).toEqual([
            expect.objectContaining({ _new_id: news.getId})
        ]);


    })
})