import { Address } from "../../entities/Address";
import { putAddressInterface } from "../../repositories/addressRepository";
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

        // * Put address

        const addressAlter: putAddressInterface = {
            add_bairro: "Teste",
            add_cep: "Teste",
            add_cidade: "Teste",
            add_number: "Teste",
            add_rua: "Teste",
            add_uf: "Teste",
            add_comp: "Teste"
        }

        const deleteAddress = await mockAddressRepository.update(addressPayload.get_add_id, addressAlter)

        expect(deleteAddress).toMatchObject({
            props: {
                add_bairro: "Teste",
                add_cep: "Teste",
                add_cidade: "Teste",
                add_number: "Teste",
                add_rua: "Teste",
                add_uf: "Teste",
                add_comp: "Teste",
                add_createdAt: expect.any(Date),
            },
            _add_id: addressPayload.get_add_id
        })
        
    });

    it('Should be returned a respect Address', async () => {

        // * Put address

        const addressAlter: putAddressInterface = {
            add_bairro: "Teste",
            add_cep: "Teste",
            add_cidade: "Teste",
            add_number: "Teste",
            add_rua: "Teste",
            add_uf: "Teste",
            add_comp: "Teste"
        }

        const deleteAddress = await mockAddressRepository.update("123", addressAlter)

        expect(deleteAddress).toEqual("Endereço não encontrado")
        
    });


})