import { mockAddressRepository as MockAddressRepository } from "../../../Address/repositories/mockAddressRepository";
import { Address } from "../../../Address/entities/Address";
import { mockEventRepository as MockEventRepository } from "../../repositories/mockEventeRepository";
import { Event } from "../../entities/Event";

let mockAddressRepository: MockAddressRepository;

let mockEventeRepository: MockEventRepository;

describe('Update Event Tests', () => {
    beforeEach(() => {
        mockAddressRepository = new MockAddressRepository()
        mockEventeRepository = new MockEventRepository()
    })

    it('Should be returned a respect Event', async () => {

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

        // * Create Event/

        const eventPayload = new Event({
            eve_data_and_time: new Date(),
            eve_desc: "Teste",
            eve_icon: "Teste",
            eve_max_participants: 100,
            eve_nome: "Teste",
            eve_point: 250,
            eve_price: 23.00,
            end_id: addressPayload.get_add_id
        })
        mockEventeRepository.create(eventPayload)

        // * Put Event

        const putEvent = await mockEventeRepository.put(eventPayload.get_id, {
            end_id: addressPayload.get_add_id,
            eve_desc: "Teste Alterado",
            eve_data_and_time: new Date(),
            eve_icon: "Teste Alterado",
            eve_max_participants: 203,
            eve_nome: "Teste Alterado",
            eve_participants: eventPayload.get_participants+10,
            eve_point: 30,
            eve_price: 30.99
        })
        
        expect(putEvent).toEqual("Evento alterado com sucesso")
    });


})