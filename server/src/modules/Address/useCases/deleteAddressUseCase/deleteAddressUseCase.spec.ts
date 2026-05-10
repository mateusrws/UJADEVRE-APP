import { Address } from "../../entities/Address";
import { mockAddressRepository as MockAddressRepository } from "../../repositories/mockAddressRepository";

let mockAddressRepository: MockAddressRepository;

describe('Delete Addresses Tests', () => {
    beforeEach(() => {
        mockAddressRepository = new MockAddressRepository()
        
    })

    it('Should be returned a respect Address', async () => {

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

        // * Deleting address

        const deleteAddress = await mockAddressRepository.delete(addressPayload.get_add_id)

        expect(deleteAddress).toEqual("Endereço deletado com sucesso")
        
    });

    it('Should be returned a respect Address', async () => {

        // * Deleting address

        const deleteAddress = await mockAddressRepository.delete("123")

        expect(deleteAddress).toEqual("Endereço não encontrado")
        
    });


})