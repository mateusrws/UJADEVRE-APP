import { compareSync } from "bcrypt";
import { mockUserRepository as MockUserRepository } from "../repositories/mockUserRepository";
import { createUserUseCase as CreateUserUseCase } from "./createUserUseCase";

let createUserUseCase: CreateUserUseCase;

let mockUserRepository: MockUserRepository;

describe('', ()=>{
    beforeEach(() => {
        mockUserRepository = new MockUserRepository()
        createUserUseCase = new CreateUserUseCase(mockUserRepository)
        jest.clearAllMocks();
    })

    it("Should be able to create address", async () => {
        expect(mockUserRepository.users).toEqual([])

        const user = await createUserUseCase.execute({
            con_id: "teste",
            end_id: "teste",
            user_bio: "teste", 
            user_cpf: "teste",
            user_data_nasc: new Date(),
            user_email: "teste",
            user_name: "teste",
            user_foto_url: "teste",
            user_senha: "teste",
            user_tel:"teste",
            user_tipo: "ADOLESCENTE"
        })

        expect(mockUserRepository.users).toEqual([
            expect.objectContaining({ _user_id: (user)._user_id })
        ]); 
    
    
    })
    it("The password has been encrypt", async () => {
        expect(mockUserRepository.users).toEqual([])

        const user = await createUserUseCase.execute({
            con_id: "teste",
            end_id: "teste",
            user_bio: "teste", 
            user_cpf: "teste",
            user_data_nasc: new Date(),
            user_email: "teste",
            user_name: "teste",
            user_foto_url: "teste",
            user_senha: "teste",
            user_tel:"teste",
            user_tipo: "Adolescente"
        })

        expect(mockUserRepository.users).toEqual([
            expect(compareSync("teste", (user).user_senha))
        ]); 
    
    
    })
})