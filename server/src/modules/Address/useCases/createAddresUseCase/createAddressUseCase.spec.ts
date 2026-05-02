import { mockAddressRepository as MockAddressRepository } from "../../repositories/mockAddressRepository";
import { createAddressUseCase as CreateAddressUseCase } from "./createAddresUseCase"

let createAddressUseCase: CreateAddressUseCase;

let mockAddressRepository: MockAddressRepository;

describe('', ()=>{
    beforeEach(() => {
        mockAddressRepository = new MockAddressRepository()
        createAddressUseCase = new CreateAddressUseCase(mockAddressRepository)
    })

    it("Should be able to create address", async () => {
        expect(mockAddressRepository.Address).toEqual([])

        const address1 = createAddressUseCase.execute({
            add_bairro: "Bairro Teste",
            add_cep: "99999999",
            add_cidade: "Cidade Teste",
            add_rua: "Rua Teste",
            add_uf: "TT",
            add_comp: "Complemento Teste"
        })

        const address2 = createAddressUseCase.execute({
            add_bairro: "Bairro Teste",
            add_cep: "99999999",
            add_cidade: "Cidade Teste",
            add_rua: "Rua Teste",
            add_uf: "TT"
        })

        expect(mockAddressRepository.Address).toEqual([
            expect.objectContaining({ _add_id: (await address1)._add_id }),
            expect.objectContaining({ _add_id: (await address2)._add_id })
        ]); 
    
    
    })
})