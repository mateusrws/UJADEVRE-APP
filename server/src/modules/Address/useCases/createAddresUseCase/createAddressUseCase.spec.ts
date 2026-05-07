import { mockAddressRepository as MockAddressRepository } from "../../repositories/mockAddressRepository";
import { createAddressUseCase as CreateAddressUseCase } from "./createAddresUseCase"

let createAddressUseCase: CreateAddressUseCase;

let mockAddressRepository: MockAddressRepository;

describe('Create Address Tests', () => {
    beforeEach(() => {
        mockAddressRepository = new MockAddressRepository()
        createAddressUseCase = new CreateAddressUseCase(mockAddressRepository)
    })

    it("Should be able to create address", async () => {
        expect(mockAddressRepository.Address).toEqual([])

        const address1 = await createAddressUseCase.execute({
            add_bairro: "Bairro Teste",
            add_cep: "99999999",
            add_cidade: "Cidade Teste",
            add_rua: "Rua Teste",
            add_uf: "TT",
            add_number: "99",
            add_comp: "Complemento Teste"
        })

        const address2 = await createAddressUseCase.execute({
            add_bairro: "Bairro Teste",
            add_cep: "99999999",
            add_cidade: "Cidade Teste",
            add_rua: "Rua Teste",
            add_number: "33",
            add_uf: "TT"
        })

        expect(mockAddressRepository.Address).toEqual([
            expect.objectContaining({ _add_id: address1.get_add_id }),
            expect.objectContaining({ _add_id: address2.get_add_id })
        ]);


    })
})