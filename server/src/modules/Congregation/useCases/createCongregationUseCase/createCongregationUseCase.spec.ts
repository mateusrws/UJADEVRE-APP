import { mockCongregationRepository as MockCongregationRepository } from "../../repositories/mockCongregationRepository";
import { mockAddressRepository as MockAddressRepository } from "../../../Address/repositories/mockAddressRepository";
import { mockCreateCongregationUseCase as MockCreateCongregationUseCase } from "./mockCreateCongregationUseCase";
import { Address } from "../../../Address/entities/Address";

let mockCreateCongregationUseCase: MockCreateCongregationUseCase;

let mockCongregationRepository: MockCongregationRepository;

let mockAddressRepository: MockAddressRepository

const mockAddress: Address = new Address({
    add_bairro: "Teste",
    add_cep: "Teste",
    add_cidade: "Teste",
    add_number: "Teste",
    add_rua: "Teste",
    add_uf: "Teste",
    add_comp: "Teste"
})

describe('', () => {
    beforeEach(() => {
        mockAddressRepository = new MockAddressRepository()
        mockCongregationRepository = new MockCongregationRepository()
        mockCreateCongregationUseCase = new MockCreateCongregationUseCase(mockCongregationRepository, mockAddressRepository)
    })

    it("Should be able to create congregation", async () => {
        expect(mockCongregationRepository.congregation).toEqual([])

        const _ = await mockAddressRepository.create(mockAddress)

        const congregation = mockCreateCongregationUseCase.execute({
            con_name: "Teste",
            end_id: mockAddress.get_add_id
        })

        expect(mockCongregationRepository.congregation).toEqual([
            expect.objectContaining({ _con_id: (await congregation)._con_id })
        ]);


    })

    it("Should be return throw because not exist the address", async () => {
        expect(mockCongregationRepository.congregation).toEqual([])

        const congregation = {
            con_name: "Teste",
            end_id: "Teste"
        };

        expect(mockCreateCongregationUseCase.execute(congregation)).rejects.toThrowErrorMatchingInlineSnapshot(`"Endereço não encontrado"`)


    })
})