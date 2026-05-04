import { mockCongregationRepository as MockCongregationRepository } from "../../repositories/mockCongregationRepository";
import { createCongregationbUseCase as CreateCongregationbUseCase } from "./createCongregationUseCase";

let createCongregationUseCase: CreateCongregationbUseCase;

let mockCongregationRepository: MockCongregationRepository;

describe('', ()=>{
    beforeEach(() => {
        mockCongregationRepository = new MockCongregationRepository()
        createCongregationUseCase = new CreateCongregationbUseCase(mockCongregationRepository)
    })

    it("Should be able to create congregation", async () => {
        expect(mockCongregationRepository.congregation).toEqual([])

        const congregation = createCongregationUseCase.execute({
            con_name: "Teste",
            end_id: "Teste",
        })

        expect(mockCongregationRepository.congregation).toEqual([
            expect.objectContaining({ _con_id: (await congregation)._con_id })
        ]); 
    
    
    })
})