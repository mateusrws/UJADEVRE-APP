import { createNewsUseCase as CreateNewsUseCase } from "./createNewsUseCase";
import { mockNewsRepository as MockNewsRepository } from "../../repositories/mockNewsRepository";

let createNewsUseCase: CreateNewsUseCase;

let mockNewsRepository: MockNewsRepository;

describe('', () => {
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
            expect.objectContaining({ _new_id: (await news)._new_id })
        ]);


    })
})