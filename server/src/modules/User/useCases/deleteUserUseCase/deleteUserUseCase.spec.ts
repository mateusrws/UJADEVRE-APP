import { Address } from "../../../Address/entities/Address";
import { mockAddressRepository as MockAddressRepository } from "../../../Address/repositories/mockAddressRepository";
import { MockCongregationRepository } from "../../../Congregation/repositories/mockCongregationRepository";
import { mockUserRepository as MockUserRepository } from "../../repositories/mockUserRepository";
import { Congregation } from "../../../Congregation/entities/Congregation";
import { TypeUser } from "types/enums/userTypeEnum";
import { User } from "../../entities/User";

let mockUserRepository: MockUserRepository

let mockAddressRepository: MockAddressRepository;

let mockCongregationRepository: MockCongregationRepository


describe('Delete News Tests', () => {
    beforeEach(() => {
        mockUserRepository = new MockUserRepository()
        mockAddressRepository = new MockAddressRepository()
        mockCongregationRepository = new MockCongregationRepository()
    })

    it('Should be delete a news', async () => {

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

        // * Delete a User

        const deleteNews = await mockUserRepository.delete(userPayload.get_user_id)

        expect(deleteNews).toEqual("Usuário deletado com sucesso")
        
    });

})