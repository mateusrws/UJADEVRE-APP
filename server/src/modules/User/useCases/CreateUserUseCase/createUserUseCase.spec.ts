import { compareSync } from "bcrypt";
import { mockUserRepository as MockUserRepository } from "../../repositories/mockUserRepository";
import { createUserUseCase as CreateUserUseCase } from "./createUserUseCase";
import { TypeUser } from "types/enums/userTypeEnum";
import { MockCongregationRepository } from "../../../Congregation/repositories/mockCongregationRepository";
import { mockAddressRepository as MockAddressRepository } from "../../../Address/repositories/mockAddressRepository";
import { Congregation } from "../../../Congregation/entities/Congregation";
import { Address } from "../../../Address/entities/Address";


let createUserUseCase: CreateUserUseCase;
let mockUserRepository: MockUserRepository;
let mockAddressRepository: MockAddressRepository;
let mockCongregationRepository: MockCongregationRepository;

describe('Create User Use Case', () => {
    beforeEach(() => {

        mockAddressRepository = new MockAddressRepository();
        mockCongregationRepository = new MockCongregationRepository();
        mockUserRepository = new MockUserRepository();


        createUserUseCase = new CreateUserUseCase(
            mockUserRepository,
            mockCongregationRepository,
            mockAddressRepository
        );

        jest.clearAllMocks();
    });

    it("Should be able to create user", async () => {

        const address = new Address({
            add_bairro: "teste",
            add_cep: "teste",
            add_cidade: "teste",
            add_comp: "teste",
            add_number: "teste",
            add_uf: "teste",
            add_rua: "teste"
        });

        const congregation = new Congregation({
            end_id: address.get_add_id,
            con_name: "teste",
        });


        mockAddressRepository.Address.push(address);
        mockCongregationRepository.congregation.push(congregation);

        expect(mockUserRepository.users).toEqual([]);


        const user = await createUserUseCase.execute({
            con_id: congregation.get_con_id,
            end_id: address.get_add_id,
            user_desc: "teste",
            user_cpf: "teste",
            user_data_nasc: new Date(),
            user_email: "teste@email.com",
            user_name: "teste",
            user_foto_url: "teste",
            user_senha: "teste-password",
            user_tel: "teste",
            user_tipo: TypeUser.ADOLESCENTE
        });


        expect(mockUserRepository.users).toHaveLength(1);
        expect(mockUserRepository.users[0].get_user_id).toBe(user.get_user_id);
    });

    it("The password has been encrypted", async () => {

        const address = new Address({
            add_bairro: "teste",
            add_cep: "teste",
            add_cidade: "teste",
            add_comp: "teste",
            add_number: "teste",
            add_uf: "teste",
            add_rua: "teste"
        });

        const congregation = new Congregation({
            end_id: address.get_add_id,
            con_name: "teste",
        });


        mockAddressRepository.Address.push(address);
        mockCongregationRepository.congregation.push(congregation);


        const rawPassword = "minha-senha-secreta";
        const user = await createUserUseCase.execute({
            con_id: congregation.get_con_id,
            end_id: address.get_add_id,
            user_desc: "teste",
            user_cpf: "teste",
            user_data_nasc: new Date(),
            user_email: "outro@email.com",
            user_name: "teste",
            user_foto_url: "teste",
            user_senha: rawPassword,
            user_tel: "teste",
            user_tipo: TypeUser.ADOLESCENTE
        });


        const isCorrectPassword = compareSync(rawPassword, user.get_user_senha);

        expect(isCorrectPassword).toBeTruthy();
        expect(user.get_user_senha).not.toBe(rawPassword);
    });
});
