import { Address } from "../../entities/Address";
import { makeAddress } from "../../factories/addressFactory";
import { mockAddressRepository as MockAddressRepository } from "../../repositories/mockAddressRepository";
import { mockGetAddressUseCase as MockGetAddressUseCase } from "../getAddressUseCase/mockGetAddressUseCase";

let mockGetAddressByIdUseCase: MockGetAddressUseCase;

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

describe('Get by Id Address Tests', () => {
    beforeEach(() => {
        mockAddressRepository = new MockAddressRepository()
        mockGetAddressByIdUseCase = new MockGetAddressUseCase(mockAddressRepository)
    })

    it("Should be returned a respect Address", async () => {

        mockAddressRepository.create(addressTest)

        const address = await mockGetAddressByIdUseCase.executeById(addressTest.get_add_id)

        expect(address).not.toBeUndefined()


    })
    it("Should be error", async () => {

        const address = await mockGetAddressByIdUseCase.executeById(addressTest.get_add_id)

        expect(address).toBeNull()

    })
    it("Should return add_id if Address already exists", async () => {
        const fakeAddress = makeAddress({});
        mockAddressRepository.create(fakeAddress)

        mockAddressRepository.Address.push(fakeAddress); 

        const address = await mockAddressRepository.getByObject({
            add_bairro: "Teste",
            add_cep: "Teste", 
            add_cidade: "Teste",
            add_number: "92",
            add_rua: "Rua teste",
            add_uf: "TT",
            add_comp: "Teste"
        });

        expect(address).toBeDefined();
        expect(address?.get_add_id).toEqual(fakeAddress.get_add_id);
    });


})