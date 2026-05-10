import { mockAddressRepository as MockAddressRepository} from "../../../Address/repositories/mockAddressRepository";
import { MockCongregationRepository } from "../../repositories/mockCongregationRepository";
import { Address } from "../../../Address/entities/Address";
import { Congregation } from "../../entities/Congregation";
import { NotFoundException } from "@nestjs/common";


let mockCongregationRepository: MockCongregationRepository;

let mockAddressRepository: MockAddressRepository;


describe('Delete Congregation Tests', () => {
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

        // * Create a Congregation

        const congregationPayload = new Congregation({
            con_name:"Teste",
            end_id: addressPayload.get_add_id
        })

        mockCongregationRepository.create(congregationPayload)

        // * Deleting congregation

        const deleteCongregation = await mockCongregationRepository.deleteCongregation(congregationPayload.get_con_id)

        expect(deleteCongregation).toEqual("Congregação deletada com sucesso")
        
    });

    it('Should be returned a error because the end_id', async () => {

        // * Deleting Congregation

        await expect(mockCongregationRepository.deleteCongregation("123")).rejects.toThrow(NotFoundException);
        
    });


})