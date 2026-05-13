import { mockRegistrationRepository as MockRegistrationRepository } from "../../repositories/mockRegistrationRepository";
import { putRegistrationUseCase as PutRegistrationUseCase } from "./putRegistrationUseCase";
import { createRegistrationUseCase as CreateRegistrationUseCase } from "../createRegistrationUseCase/createRegistrationUseCase";
import { mockUserRepository as MockUserRepository } from "../../../User/repositories/mockUserRepository";
import { mockAddressRepository as MockAddressRepository } from "../../../Address/repositories/mockAddressRepository";
import { mockEventRepository as MockEventRepository } from "../../../Event/repositories/mockEventeRepository";
import { getEventUseCase as GetEventUseCase } from "../../../Event/useCases/GetEventUseCase/getEventUseCase";
import { Address } from "../../../Address/entities/Address";
import { User } from "../../../User/entities/User";
import { Event } from "../../../Event/entities/Event";
import { TypeUser } from "types/enums/userTypeEnum";
import { Registration } from "../../entities/Registration";

let putRegistrationUseCase: PutRegistrationUseCase;
let createRegistrationUseCase: CreateRegistrationUseCase;
let mockRegistrationRepository: MockRegistrationRepository;
let mockUserRepository: MockUserRepository;
let mockAddressRepository: MockAddressRepository;
let mockEventRepository: MockEventRepository;
let getEventUseCase: GetEventUseCase;

let mockAddress: Address;
let mockUser: User;
let mockEvent: Event;
let mockRegistration: Registration;

describe('Put Registration Tests', () => {
    beforeAll(async () => {
        mockRegistrationRepository = new MockRegistrationRepository();
        mockUserRepository = new MockUserRepository();
        mockAddressRepository = new MockAddressRepository();
        mockEventRepository = new MockEventRepository();
        getEventUseCase = new GetEventUseCase(mockEventRepository);
        putRegistrationUseCase = new PutRegistrationUseCase(mockRegistrationRepository);
        createRegistrationUseCase = new CreateRegistrationUseCase(mockRegistrationRepository, getEventUseCase);

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

        // Create a registration to be updated in the tests
        mockRegistration = await createRegistrationUseCase.execute({
            eve_id: mockEvent.get_id,
            user_id: mockUser.get_user_id,
            reg_term_url: "https://termo.original.com",
        });
    });

    it("Should be able to update a registration", async () => {
        const result = await putRegistrationUseCase.execute(mockRegistration.get_reg_id, {
            eve_id: mockEvent.get_id,
            user_id: mockUser.get_user_id,
            reg_remain_value: 25.00,
            reg_term_url: "https://termo.atualizado.com",
            reg_isValid: true
        });

        expect(result).not.toBe("Ingresso não encontrado");

        const updated = mockRegistrationRepository.registrations.find(
            r => r.get_reg_id === mockRegistration.get_reg_id
        );

        expect(updated).toBeDefined();
        expect(updated!.get_reg_remain_value).toBe(25.00);
        expect(updated!.get_reg_term_url).toBe("https://termo.atualizado.com");
    });

    it("Should return 'Ingresso não encontrado' when registration does not exist", async () => {
        const result = await putRegistrationUseCase.execute(
            "00000000-0000-0000-0000-000000000000",
            {
                eve_id: mockEvent.get_id,
                user_id: mockUser.get_user_id,
                reg_remain_value: 10.00,
                reg_term_url: "https://termo.inexistente.com",
                reg_isValid: true
            }
        );

        expect(result).toBe("Ingresso não encontrado");
    });

    it("Should keep the same reg_id after update", async () => {
        const originalId = mockRegistration.get_reg_id;

        await putRegistrationUseCase.execute(originalId, {
            eve_id: mockEvent.get_id,
            user_id: mockUser.get_user_id,
            reg_remain_value: 0,
            reg_term_url: "https://termo.novo.com",
            reg_isValid: true
        });

        const updated = mockRegistrationRepository.registrations.find(
            r => r.get_reg_id === originalId
        );
        expect(updated).toBeDefined();
        expect(updated!.get_reg_id).toBe(originalId);
    });
});
