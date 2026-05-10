import { mockUserRepository as MockUserRepository } from "../../repositories/mockUserRepository";
import { getUserUseCase as GetUserUseCase } from "./getUserUseCase";
import { createUserUseCase as CreateUserUseCase } from "../CreateUserUseCase/createUserUseCase";
import { TypeUser } from "types/enums/userTypeEnum";
import { MockCongregationRepository } from "../../../Congregation/repositories/mockCongregationRepository";
import { mockAddressRepository as MockAddressRepository } from "../../../Address/repositories/mockAddressRepository";
import { Congregation } from "../../../Congregation/entities/Congregation";
import { Address } from "../../../Address/entities/Address";

let getUserUseCase: GetUserUseCase;
let createUserUseCase: CreateUserUseCase;
let mockUserRepository: MockUserRepository;
let mockAddressRepository: MockAddressRepository
let mockCongregationRepository: MockCongregationRepository


// * Address Payload

const addressPayload = new Address({
    add_bairro: "Teste",
    add_cep: "Teste",
    add_cidade: "Teste",
    add_number: "Teste",
    add_rua: "Teste",
    add_uf: "Teste",
    add_comp: "Teste"
})

// * Congregation Payload

const congregationsPayload = new Congregation({
    con_name: "Teste",
    end_id: addressPayload.get_add_id
})

// * User Payload

const userPayload = {
    user_name: "Teste",
    user_email: "teste@teste.com",
    user_tel: "99999999999",
    user_senha: "senha123",
    user_tipo: TypeUser.ADOLESCENTE,
    user_data_nasc: new Date("2000-01-01"),
    user_desc: "Bio teste",
    user_cpf: "12345678900",
    user_foto_url: "https://foto.teste.com",
    con_id: congregationsPayload.get_con_id,
    end_id: addressPayload.get_add_id,
}

describe('Get User Tests', () => {
    beforeEach(() => {
        mockAddressRepository = new MockAddressRepository()
        mockCongregationRepository = new MockCongregationRepository()
        mockUserRepository = new MockUserRepository()
        getUserUseCase = new GetUserUseCase(mockUserRepository)
        createUserUseCase = new CreateUserUseCase(mockUserRepository, mockCongregationRepository, mockAddressRepository)

        // seed FK dependencies
        mockAddressRepository.Address.push(addressPayload)
        mockCongregationRepository.congregation.push(congregationsPayload)
    })

    it("Should return all users", async () => {
        expect(mockUserRepository.users).toEqual([])

        const created = await createUserUseCase.execute(userPayload)

        const users = await getUserUseCase.execute()

        expect(users).toHaveLength(1)
        expect(users[0]).toMatchObject({
            user_id: created.get_user_id,
            user_name: "Teste",
            user_email: "teste@teste.com",
        })
    })

    it("Should return user by id", async () => {
        const created = await createUserUseCase.execute(userPayload)

        const user = await getUserUseCase.executeById(created.get_user_id)

        expect(user).not.toBeNull()
        expect(user.user_id).toBe(created.get_user_id)
    })

    it("Should throw when user not found", async () => {
        await expect(getUserUseCase.executeById("non-existent-id")).rejects.toThrow("User not found!")
    })
})
