import { mockAddressRepository as MockAddressRepository} from "../../../Address/repositories/mockAddressRepository";
import { Address } from "../../../Address/entities/Address";
import { Event } from "../../entities/Event";
import { mockEventRepository as MockEventRepository } from "../../repositories/mockEventeRepository";


let mockAddressRepository: MockAddressRepository;

let mockEventeRepository: MockEventRepository;


describe('Delete Event Tests', () => {
    beforeEach(() => {
        mockAddressRepository = new MockAddressRepository()
        mockEventeRepository = new MockEventRepository()
    })

    it('Should be delete a event', async () => {

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

        // * Create a Event

        const eventPayload = new Event({
            end_id: "123",
            eve_nome: "any_name",
            eve_desc: "any_description",
            eve_data_and_time: new Date(),
            eve_max_participants: 100,
            eve_icon: "teste",
            eve_point: 100,
            eve_price: 12.50,
            eve_participants: 0 
        })

        mockEventeRepository.create(eventPayload)

        // * Deleting address

        const deleteCongregation = await mockEventeRepository.delete(eventPayload.get_id)

        expect(deleteCongregation).toEqual("Evento deletado com sucesso")
        
    });

    it('Should be returned a error because the end_id', async () => {

        // * Deleting address

        const deleteAddress = await mockAddressRepository.delete("123")

        expect(deleteAddress).toEqual("Endereço não encontrado")
        
    });


})