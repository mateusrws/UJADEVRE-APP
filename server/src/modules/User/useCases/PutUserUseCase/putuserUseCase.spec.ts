import { mockAddressRepository as MockAddressRepository } from "../../../Address/repositories/mockAddressRepository";
import { Address } from "../../../Address/entities/Address";
import { MockCongregationRepository } from "../../../Congregation/repositories/mockCongregationRepository";
import { mockUserRepository as MockUserRepository } from "../../repositories/mockUserRepository";
import { Congregation } from "../../../Congregation/entities/Congregation";
import { User } from "../../entities/User";
import { TypeUser } from "types/enums/userTypeEnum";

let mockAddressRepository: MockAddressRepository;

let mockCongregationRepository: MockCongregationRepository;

let mockUserRepository: MockUserRepository;

describe('Update Congregation Tests', () => {
    beforeEach(() => {
        mockAddressRepository = new MockAddressRepository()
        mockCongregationRepository = new MockCongregationRepository()
        mockUserRepository = new MockUserRepository()
    })

    it('Should be returned a respect User', async () => {

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

        // * Create Congregation/

        const congregationPayload = new Congregation({
            con_name: "Teste",
            end_id: addressPayload.get_add_id
        })
        mockCongregationRepository.create(congregationPayload)

        // * Create User

        const userPayload = new User({
            con_id: congregationPayload.get_con_id,
            end_id: addressPayload.get_add_id, // Aqui eu coloquei o mesmo endereço da Conogregação mas a ideia é ser um endereço qualquer
            user_cpf: "Teste",
            user_data_nasc: new Date("2006-09-27"),
            user_desc: "Teste",
            user_email: "teste@teste.com",
            user_foto_url: "teste.com",
            user_name: "Teste",
            user_senha: "Teste",
            user_tel: "(99)99999-9999",
            user_tipo: TypeUser.ADOLESCENTE
        })
        mockUserRepository.create(userPayload)

        // * Put User

        const putUser = await mockUserRepository.put(userPayload.get_user_id, {
            con_id: userPayload.get_con_id,
            end_id: userPayload.get_end_id,
            user_cpf: "Teste Alterado",
            user_data_nasc: new Date(),
            user_desc: "Teste Alterado",
            user_email: "Teste Alterado",
            user_foto_url: "Teste Alterado",
            user_name: "Teste Alterado",
            user_tel: "Teste Alterado"
        })
        
        expect(putUser).toEqual("Usuário alterado com sucesso")
    });


})