import { Injectable, NotFoundException } from "@nestjs/common"
import { userRepository as UserRepository } from "../../repositories/userRepository"

@Injectable()
export class deleteUserByIdUseCase {
    constructor(private userRepository: UserRepository) { }

    async execute(user_id: string) {

        const userExisits = await this.userRepository.getById(user_id)
        if(!userExisits){
            throw new NotFoundException("Usuário não encontrado")
        }
        
        return await this.userRepository.delete(user_id)
    }
}