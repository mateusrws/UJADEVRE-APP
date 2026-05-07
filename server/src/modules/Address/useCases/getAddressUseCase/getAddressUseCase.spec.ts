import { Address } from "../../entities/Address";
import { mockAddressRepository as MockAddressRepository } from "../../repositories/mockAddressRepository";

let mockAddressRepository: MockAddressRepository;

const addressTest = new Address({
    add_bairro: "teste",
    add_cidade: "teste",
    add_uf: "teste",
    add_cep: "teste",
    add_number: "teste",
    add_rua: "teste",
    add_comp: "teste"
})

describe('Get Addresses Tests', () => {
    beforeEach(() => {
        mockAddressRepository = new MockAddressRepository()
    })

    it('Should be returned a respect Address', async () => {

        const addresses = await mockAddressRepository.get(); 

        expect(addresses).toEqual([]);
    });
    it('Should return an address after creating one', async () => {
        await mockAddressRepository.create(addressTest);
        const addresses = await mockAddressRepository.get();
        
        expect(addresses).toHaveLength(1);
        expect(addresses[0]).toBe(addressTest);
    });


})