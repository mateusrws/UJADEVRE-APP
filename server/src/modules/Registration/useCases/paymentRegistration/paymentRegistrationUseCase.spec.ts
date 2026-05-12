import { mockUserRepository as MockUserRepository } from "../../../User/repositories/mockUserRepository";
import { mockRegistrationRepository as MockRegistrationRepository } from "../../repositories/mockRegistrationRepository";
import { mockAddressRepository as MockAddressRepository } from "../../../Address/repositories/mockAddressRepository";
import { mockEventRepository as MockEventRepository } from "../../../Event/repositories/mockEventeRepository";
import { createRegistrationUseCase as CreateRegistrationUseCase } from "../createRegistrationUseCase/createRegistrationUseCase";
import { Address } from "../../../Address/entities/Address";
import { User } from "../../../User/entities/User";
import { Event } from "../../../Event/entities/Event";
import { TypeUser } from "types/enums/userTypeEnum";
import { Registration } from "../../entities/Registration";

let createRegistrationUseCase: CreateRegistrationUseCase;
let mockRegistrationRepository: MockRegistrationRepository;
let mockUserRepository: MockUserRepository;
let mockAddressRepository: MockAddressRepository;
let mockEventRepository: MockEventRepository;

let mockAddress: Address;
let mockUser: User;
let mockEvent: Event;

describe('Execute payment Registration Tests', () => {
    beforeAll(async () => {
        mockRegistrationRepository = new MockRegistrationRepository();
        mockUserRepository = new MockUserRepository();
        mockAddressRepository = new MockAddressRepository();
        mockEventRepository = new MockEventRepository();

        createRegistrationUseCase = new CreateRegistrationUseCase(mockRegistrationRepository);

        // Mock Address
        mockAddress = new Address({
            add_bairro: "Bairro Teste",
            add_cep: "12345678",
            add_cidade: "Cidade Teste",
            add_rua: "Rua Teste",
            add_number: "100",
            add_uf: "SP",
            add_comp: "Apto 1",
        });
        await mockAddressRepository.create(mockAddress);

        // Mock User
        mockUser = new User({
            user_name: "Usuário Teste",
            user_email: "teste@teste.com",
            user_tel: "+5511999999999",
            user_senha: "senha123",
            user_tipo: TypeUser.ADOLESCENTE,
            user_data_nasc: new Date("2000-01-01"),
            user_desc: "Descrição teste",
            user_cpf: "12345678901",
            user_foto_url: "https://foto.teste.com",
            con_id: "con-teste",
            end_id: mockAddress.get_add_id,
        });
        await mockUserRepository.create(mockUser);

        // Mock Event
        mockEvent = new Event({
            eve_nome: "Evento Teste",
            eve_data_and_time: new Date("2026-12-01T18:00:00"),
            eve_desc: "Descrição do evento teste",
            eve_price: 50.00,
            eve_point: 100,
            end_id: mockAddress.get_add_id,
            eve_max_participants: 30,
            eve_icon: "calendar",
        });
        await mockEventRepository.create(mockEvent);
    });

    it("Should be able to execute a payment", async () => {
        expect(mockRegistrationRepository.registrations).toEqual([]);

        const registration = new Registration({
            eve_id: mockEvent.get_id,
            user_id: mockUser.get_user_id,
            reg_remain_value: 20.00,
            reg_term_url: "https://termo.teste.com",
        })

        await mockRegistrationRepository.create(registration)

        expect(mockRegistrationRepository.updateRemainValue(registration.get_reg_id, 10.00))
    });
});
