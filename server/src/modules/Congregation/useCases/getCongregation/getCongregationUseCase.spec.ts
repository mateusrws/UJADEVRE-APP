import { Address } from "../../../Address/entities/Address";
import { Congregation } from "../../entities/Congregation";
import { MockCongregationRepository } from "../../repositories/mockCongregationRepository";
import { mockAddressRepository as MockAddressRepository } from "../../../Address/repositories/mockAddressRepository";

let mockCongregationoRepository: MockCongregationRepository;

let mockAddressRepository: MockAddressRepository


describe('Get Congregation Tests', () => {
    beforeEach(() => {
        mockCongregationoRepository = new MockCongregationRepository()
        mockAddressRepository = new MockAddressRepository()
    })

    it('Should be returned a respect Congregations', async () => {

        const congregation = await mockCongregationoRepository.getCongregations(); 

        expect(congregation).toEqual([]);
    });
    it('Should return an congregations after creating one', async () => {

        
        // * Create a Address Fake
        const address = new Address({ add_bairro: "Teste", add_cep: "Teste", add_cidade: "Teste", add_number: "Teste", add_rua: "Teste", add_uf: "Teste", add_comp: "Teste"})

        await mockAddressRepository.create(address)


        // * Create a Congregation Fake
        const congregation: Congregation = new Congregation({
            con_name: "Teste",
            end_id: address.get_add_id,
        })
        await mockCongregationoRepository.create(congregation);

        // * Get the Congregations
        const congregations = await mockCongregationoRepository.getCongregations()
        
        expect(congregations).toHaveLength(1);
        expect(congregations[0]).toEqual(congregation);
    });


})