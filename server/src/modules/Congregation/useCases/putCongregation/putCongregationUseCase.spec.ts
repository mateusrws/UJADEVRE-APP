import { mockAddressRepository as MockAddressRepository } from "../../../Address/repositories/mockAddressRepository";
import { MockCongregationRepository } from "../../repositories/mockCongregationRepository";
import { Address } from "../../../Address/entities/Address";
import { Congregation } from "../../entities/Congregation";

let mockCongregationRepository: MockCongregationRepository;

let mockAddressRepository: MockAddressRepository;

describe('Update Congregation Tests', () => {
    beforeEach(() => {
        mockCongregationRepository = new MockCongregationRepository()
        mockAddressRepository = new MockAddressRepository()
    })

    it('Should be returned a respect Congregation', async () => {

        // * Create a Address

        const addressPayload = new Address({
            add_bairro: "Teste",
            add_cep: "Teste",
            add_cidade: "Teste",
            add_number: "Teste",
            add_rua: "Teste",
            add_uf: "Teste",
            add_comp: "Teste"
        })
        mockAddressRepository.create(addressPayload)

        // * Create congregation

        const congregationPayload = new Congregation({
            con_name: "Teste",
            end_id: addressPayload.get_add_id
        })

        await mockCongregationRepository.create(congregationPayload)

        // * Put Congregation

        const putCongregation = await mockCongregationRepository.putCongregation(congregationPayload.get_con_id, { con_name: "Teste Alterado", end_id: congregationPayload.get_end_id })
        
        expect(putCongregation).toEqual("Congregação alterada com sucesso")
    });


})