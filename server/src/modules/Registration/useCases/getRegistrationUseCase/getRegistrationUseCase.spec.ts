import { MockCongregationRepository } from "../../../Congregation/repositories/mockCongregationRepository";
import { Address } from "../../../Address/entities/Address";
import { mockAddressRepository as MockAddressRepository } from "../../../Address/repositories/mockAddressRepository";
import { mockUserRepository as MockUserRepository } from "../../../User/repositories/mockUserRepository";
import { mockRegistrationRepository as MockRegistrationRepository } from "../../repositories/mockRegistrationRepository";
import { mockEventRepository as MockEventRepository } from "../../../Event/repositories/mockEventeRepository";
import { createRegistrationUseCase as CreateRegistrationUseCase } from "../createRegistrationUseCase/createRegistrationUseCase";
import { User } from "../../../User/entities/User";
import { TypeUser } from "types/enums/userTypeEnum";
import { Event } from "../../../Event/entities/Event";
import { Registration } from "../../entities/Registration";
import { getRegistrationsUseCase as GetRegistrationsUseCase } from "./getRegistrationUseCase";
import { makeUser } from "src/modules/User/factories/userFactory";
import { makeRegistration } from "../../factories/regFactory";

let mockCongregationRepository: MockCongregationRepository

let createRegistrationUseCase: CreateRegistrationUseCase

let mockEventRepository: MockEventRepository

let mockUserRepository: MockUserRepository

let mockAddressRepository: MockAddressRepository;

let mockRegistrationRepository: MockRegistrationRepository

let getRegistrationsUseCase: GetRegistrationsUseCase;


let mockAddress;
let mockEvent;
let mockUser;
let mockRegistration;

const addressTest = new Address({
    add_bairro: "teste",
    add_cidade: "teste",
    add_uf: "teste",
    add_cep: "teste",
    add_number: "teste",
    add_rua: "teste",
    add_comp: "teste"
})

describe('Get Address Tests', () => {
    beforeAll(async () => {
        mockRegistrationRepository = new MockRegistrationRepository();
        mockUserRepository = new MockUserRepository();
        mockAddressRepository = new MockAddressRepository();
        mockEventRepository = new MockEventRepository();
        getRegistrationsUseCase = new GetRegistrationsUseCase(mockRegistrationRepository)
        createRegistrationUseCase = new CreateRegistrationUseCase(mockRegistrationRepository)

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

        // Mock Registration

        mockRegistration = new Registration({
            eve_id: mockEvent.get_eve_id,
            reg_remain_value: 30,
            reg_term_url: "teste",
            user_id: mockUser.get_user_id
        })
    });

    it("Should be returned a respect Registration", async () => {

        mockRegistrationRepository.create(mockRegistration)

        const registration = await getRegistrationsUseCase.executeById(mockRegistration.get_reg_id)

        expect(registration).not.toBeUndefined()


    })
    it("Should be error", async () => {

        const address = await mockRegistrationRepository.getById(addressTest.get_add_id)

        expect(address).toBeNull()

    })
    it("Should be return a regitrations", async () => {

        const registrations = await getRegistrationsUseCase.execute()

        expect(registrations).toHaveLength(1)

    })
    it("Should be return a registrations for respect userId", async () => {
        const user = makeUser({});

        const registrationMocks = [...new Array(10)].map(() =>
            makeRegistration({ user_id: user.get_user_id })
        );

        await Promise.all(
            registrationMocks.map(reg => mockRegistrationRepository.create(reg))
        );

        const result = await getRegistrationsUseCase.executeMyRegistrations({
            userId: user.get_user_id
        });

        expect(result).toHaveLength(10);
        expect(result).toEqual(expect.arrayContaining(registrationMocks));
    });
    it("Should be return a registrations for respect userId", async () => {
        const user1 = makeUser({});
        const user2 = makeUser({});

        const registrationMocks = [...new Array(10)].map((_, index) =>
            makeRegistration({ user_id: index < 5 ? user1.get_user_id: user2.get_user_id })
        );

        await Promise.all(
            registrationMocks.map(reg => mockRegistrationRepository.create(reg))
        );

        const result = await getRegistrationsUseCase.executeMyRegistrations({
            userId: user1.get_user_id
        });

        expect(result).toHaveLength(5)
    });
    it("Should be able to control notes per pages", async () => {
        const user = makeUser({});

        const registrationMocks = [...new Array(10)].map(() =>
            makeRegistration({ user_id: user.get_user_id })
        );

        await Promise.all(
            registrationMocks.map(reg => mockRegistrationRepository.create(reg))
        );
        const result = await getRegistrationsUseCase.executeMyRegistrations({
            userId: user.get_user_id,
            perPage: "8"
        })
        expect(result).toHaveLength(8)
    });
    it("Should be able to control notes pages", async () => {
        const user = makeUser({});

        const registrationMocks = [...new Array(10)].map((_, i) =>
            makeRegistration({ user_id: user.get_user_id, reg_term_url: i < 5 ? "Sem url":"Com url" })
        );

        await Promise.all(
            registrationMocks.map(reg => mockRegistrationRepository.create(reg))
        );
        const result = await getRegistrationsUseCase.executeMyRegistrations({
            userId: user.get_user_id,
            perPage: "8",
            page: "2"
        })
        expect(result[0].get_reg_term_url).toEqual("Com url")
    });
})